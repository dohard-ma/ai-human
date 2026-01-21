"use client";

import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ThoughtReport } from "@/components/chat/ThoughtReport";
import { ChatInput } from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLastConversation } from "@/app/actions/chat-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thought?: string | null;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [streamingThought, setStreamingThought] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // 加载历史记录
  useEffect(() => {
    const loadHistory = async () => {
      const lastConv = await getLastConversation();
      if (lastConv) {
        setConversationId(lastConv.id);
        setMessages(lastConv.messages as Message[]);
      }
    };
    loadHistory();
  }, []);

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, streamingThought, scrollToBottom]);

  const handleSend = async (content: string) => {
    if (loading) return;

    // 添加用户消息到 UI
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setStreamingThought("");
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, conversationId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let messageId: string | undefined;
      let finalThought = "";
      let finalContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              switch (data.type) {
                case "init":
                  setConversationId(data.conversationId);
                  break;
                case "thought":
                  finalThought += data.content;
                  setStreamingThought((prev) => prev + data.content);
                  break;
                case "content":
                  finalContent += data.content;
                  setStreamingContent((prev) => prev + data.content);
                  break;
                case "done":
                  messageId = data.messageId;
                  break;
                case "error":
                  console.error("Stream error:", data.message);
                  break;
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }

      // 流式完成，添加完整消息
      if (messageId) {
        setMessages((prev) => [
          ...prev,
          {
            id: messageId,
            role: "assistant",
            content: finalContent,
            thought: finalThought || null,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
      setStreamingThought("");
      setStreamingContent("");
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-background">
      <ChatHeader />

      <main className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div
            className="max-w-2xl mx-auto pt-4 pb-48 space-y-6"
            style={{ contain: "inline-size" }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "assistant" && msg.thought ? (
                  <div className="px-4">
                    <ThoughtReport thought={msg.thought} answer={msg.content} />
                  </div>
                ) : (
                  <ChatMessage role={msg.role} content={msg.content} />
                )}
              </div>
            ))}

            {/* 流式响应显示 */}
            {loading && (
              <div className="px-4">
                {streamingThought || streamingContent ? (
                  <ThoughtReport
                    thought={streamingThought || "正在思考中..."}
                    answer={streamingContent}
                    status={streamingContent ? "complete" : "thinking"}
                  />
                ) : (
                  <ThoughtReport thought="正在思考中..." status="thinking" />
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
