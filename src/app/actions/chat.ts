"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import systemPrompts from "@/prompts/system";

const openai = new OpenAI({
  apiKey: process.env.ARK_API_KEY,
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
});

// 默认系统提示词，可通过环境变量 SYSTEM_PROMPT 自定义
const DEFAULT_SYSTEM_PROMPT = systemPrompts() || "你是人工智能助手";

export async function sendMessage(content: string, conversationId?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // 1. 获取或创建对话
  let conversation;
  if (conversationId) {
    conversation = await prisma.conversation.findUnique({
      where: { id: conversationId, userId },
    });
  }

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId,
        title: content.slice(0, 20),
      },
    });
  }

  // 2. 保存用户消息
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content,
    },
  });

  // 3. 获取历史消息用于上下文（取最新的 10 条，然后反转为时间升序）
  // 这里很重要
  const history = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "desc" }, // 先按降序取最新的
    take: 10,
  });
  history.reverse(); // 反转为时间升序

  const messages = history.map((m) => ({
    role: m.role as "user" | "assistant" | "system",
    content: m.content,
  }));

  // 如果没有系统提示词，可以加一个
  if (!messages.some((m) => m.role === "system")) {
    messages.unshift({ role: "system", content: DEFAULT_SYSTEM_PROMPT });
  }

  // 4. 调用 AI 模型
  const completion = await openai.chat.completions.create({
    messages,
    model: process.env.ARK_ENDPOINT_ID || "",
  });

  const assistantContent = completion.choices[0]?.message?.content || "";

  // 某些模型（如豆包/Ark 的思考模型）可能会在 message 中返回 reasoning_content 或类似字段
  // 根据 Volcengine 文档，有些模型支持返回思考过程
  const thought =
    (
      completion.choices[0]?.message as unknown as {
        reasoning_content?: string;
      }
    ).reasoning_content || null;

  // 5. 保存 AI 回复
  const assistantMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      content: assistantContent,
      thought,
    },
  });

  return {
    conversationId: conversation.id,
    message: assistantMessage,
  };
}

/**
 * 用于流式 API 的辅助函数：准备对话和保存用户消息
 */
export async function prepareConversation(
  content: string,
  conversationId?: string,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // 获取或创建对话
  let conversation;
  if (conversationId) {
    conversation = await prisma.conversation.findUnique({
      where: { id: conversationId, userId },
    });
  }

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId,
        title: content.slice(0, 20),
      },
    });
  }

  // 保存用户消息
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content,
    },
  });

  // 获取历史消息用于上下文（取最新的 10 条，然后反转为时间升序）
  const history = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "desc" }, // 先按降序取最新的
    take: 10,
  });
  history.reverse(); // 反转为时间升序

  const messages = history.map((m) => ({
    role: m.role as "user" | "assistant" | "system",
    content: m.content,
  }));

  if (!messages.some((m) => m.role === "system")) {
    messages.unshift({ role: "system", content: DEFAULT_SYSTEM_PROMPT });
  }

  return {
    conversationId: conversation.id,
    messages,
  };
}

/**
 * 保存 AI 回复到数据库
 */
export async function saveAssistantMessage(
  conversationId: string,
  content: string,
  thought?: string | null,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const assistantMessage = await prisma.message.create({
    data: {
      conversationId,
      role: "assistant",
      content,
      thought,
    },
  });

  return assistantMessage;
}
