"use client";

import { ChatMessage } from "@/components/chat/ChatMessage";
import { ThoughtReport } from "@/components/chat/ThoughtReport";
import { ChatInput } from "@/components/chat/ChatInput";
import { EmptyState } from "@/components/chat/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thought?: string | null;
}

interface ChatViewProps {
  initialMessages?: Message[];
  initialConversationId?: string;
}

export function ChatView({
  initialMessages = [],
  initialConversationId,
}: ChatViewProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(
    initialConversationId,
  );
  const [streamingThought, setStreamingThought] = useState("");
  const [streamingContent, setStreamingContent] = useState("");
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const [expandedThoughts, setExpandedThoughts] = useState<
    Record<string, boolean>
  >({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);

  // 获取滚动容器
  const getScrollContainer = useCallback(() => {
    return scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
  }, []);

  // 检查是否接近底部
  const checkIsNearBottom = useCallback(() => {
    const container = getScrollContainer();
    if (!container) return true;
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < 20;
  }, [getScrollContainer]);

  // 使用 RAF 节流的滚动函数
  const scrollToBottom = useCallback(() => {
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

  // 监听滚动事件
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;
    const handleScroll = () => {
      isNearBottomRef.current = checkIsNearBottom();
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [getScrollContainer, checkIsNearBottom]);

  // 新消息时自动滚动
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

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setStreamingThought("");
    setStreamingContent("");
    const tempId = `streaming-${Date.now()}`;
    setStreamingMessageId(tempId);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, conversationId }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let messageId: string | undefined;
      let finalThought = "";
      let finalContent = "";
      let newConversationId: string | undefined;

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
                  newConversationId = data.conversationId;
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

      // 如果是新会话，更新 URL
      if (newConversationId && !initialConversationId) {
        router.replace(`/chat/${newConversationId}`);
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

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  const hasMessages = messages.length > 0 || loading;

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Chat Area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div
            className="max-w-2xl mx-auto pt-4 pb-8"
            style={{ contain: "inline-size" }}
          >
            {/* Empty State */}
            {!hasMessages && (
              <EmptyState
                suggestions={[
                  {
                    category: "能力诊断",
                    text: "帮我分析一下我在跨部门协作中的风格。",
                    onClick: () =>
                      handleSuggestionClick(
                        "帮我分析一下我在跨部门协作中的风格。",
                      ),
                  },
                  {
                    category: "职业建议",
                    text: "根据我的天赋，有哪些更适合我的岗位？",
                    onClick: () =>
                      handleSuggestionClick(
                        "根据我的天赋，有哪些更适合我的岗位？",
                      ),
                  },
                ]}
              />
            )}

            {/* Messages */}
            {hasMessages && (
              <div className="space-y-6">
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
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input at Bottom */}
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
