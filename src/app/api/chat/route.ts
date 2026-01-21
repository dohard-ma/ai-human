import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { prepareConversation, saveAssistantMessage } from "@/app/actions/chat";

const openai = new OpenAI({
  apiKey: process.env.ARK_API_KEY,
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { content, conversationId } = await request.json();

    if (!content || typeof content !== "string") {
      return new Response("Invalid content", { status: 400 });
    }

    // 准备对话并保存用户消息
    const { conversationId: convId, messages } = await prepareConversation(
      content,
      conversationId,
    );

    // 调试：打印发送给 API 的消息
    console.log("Messages sent to API:", JSON.stringify(messages, null, 2));
    console.log("Model/Endpoint:", process.env.ARK_ENDPOINT_ID);

    // 创建流式响应
    const stream = await openai.chat.completions.create({
      messages,
      model: process.env.ARK_ENDPOINT_ID || "",
      stream: true,
    });

    let fullContent = "";
    let thought: string | null = null;

    // 使用 ReadableStream 返回流式响应
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          // 先发送 conversationId
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "init", conversationId: convId })}\n\n`,
            ),
          );

          for await (const chunk of stream) {
            console.log("Chunk received:", JSON.stringify(chunk, null, 2));
            const delta = chunk.choices[0]?.delta;

            // 处理思考内容（如果模型支持）
            const reasoningContent = (
              delta as unknown as { reasoning_content?: string }
            )?.reasoning_content;
            if (reasoningContent) {
              thought = (thought || "") + reasoningContent;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "thought", content: reasoningContent })}\n\n`,
                ),
              );
            }

            // 处理正常内容
            const content = delta?.content;
            if (content) {
              fullContent += content;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ type: "content", content })}\n\n`,
                ),
              );
            }
          }

          // 流式完成后保存到数据库
          const savedMessage = await saveAssistantMessage(
            convId,
            fullContent,
            thought,
          );

          // 发送完成信号
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "done", messageId: savedMessage.id })}\n\n`,
            ),
          );

          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: "Stream error" })}\n\n`,
            ),
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
