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
  // 用于保持流式消息和最终消息的 key 一致，避免组件重新挂载
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  // 保存每条消息的展开状态
  const [expandedThoughts, setExpandedThoughts] = useState<
    Record<string, boolean>
  >({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);

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

  // 获取滚动容器
  const getScrollContainer = useCallback(() => {
    return scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
  }, []);

  // 检查是否接近底部（阈值 100px）
  const checkIsNearBottom = useCallback(() => {
    const container = getScrollContainer();
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < 20;
  }, [getScrollContainer]);

  // 使用 RAF 节流的滚动函数
  const scrollToBottom = useCallback(() => {
    // 取消之前的 RAF 请求，避免累积
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const container = getScrollContainer();
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
      rafIdRef.current = null;
    });
  }, [getScrollContainer]);

  // 监听滚动事件，更新 isNearBottom 状态
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    const handleScroll = () => {
      isNearBottomRef.current = checkIsNearBottom();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [getScrollContainer, checkIsNearBottom]);

  // 新消息时自动滚动（仅当接近底部时）
  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, streamingContent, streamingThought, scrollToBottom]);

  // 清理 RAF
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

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
    // 生成临时 ID 用于流式消息
    const tempId = `streaming-${Date.now()}`;
    setStreamingMessageId(tempId);

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
                  // 将临时 ID 的展开状态转移到真实 ID
                  setExpandedThoughts((prev) => {
                    if (tempId in prev) {
                      const { [tempId]: expandedState, ...rest } = prev;
                      return { ...rest, [messageId!]: expandedState };
                    }
                    return prev;
                  });
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
      setStreamingMessageId(null);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
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
                    <ThoughtReport
                      thought={msg.thought}
                      answer={msg.content}
                      isExpanded={expandedThoughts[msg.id]}
                      onExpandedChange={(expanded) =>
                        setExpandedThoughts((prev) => ({
                          ...prev,
                          [msg.id]: expanded,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <ChatMessage role={msg.role} content={msg.content} />
                )}
              </div>
            ))}

            {/* 流式响应显示 */}
            {loading && streamingMessageId && (
              <div key={streamingMessageId} className="px-4">
                {streamingThought || streamingContent ? (
                  <ThoughtReport
                    thought={streamingThought || "正在思考中..."}
                    answer={streamingContent}
                    status={streamingContent ? "completed" : "thinking"}
                    isExpanded={expandedThoughts[streamingMessageId]}
                    onExpandedChange={(expanded) =>
                      setExpandedThoughts((prev) => ({
                        ...prev,
                        [streamingMessageId]: expanded,
                      }))
                    }
                  />
                ) : (
                  <ThoughtReport
                    thought="正在思考中..."
                    status="thinking"
                    isExpanded={expandedThoughts[streamingMessageId]}
                    onExpandedChange={(expanded) =>
                      setExpandedThoughts((prev) => ({
                        ...prev,
                        [streamingMessageId]: expanded,
                      }))
                    }
                  />
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
