import { ChatView } from "@/components/chat/ChatView";
import { getConversation } from "@/app/actions/chat-data";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thought?: string | null;
}

export default async function ChatIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const conversation = await getConversation(id);

  // 会话不存在，显示提示页面
  if (!conversation) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <div className="size-16 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">会话不存在</h2>
          <p className="text-sm text-muted-foreground text-pretty">
            您访问的会话可能已被删除或从未存在。
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            <Plus className="size-4" />
            开启新对话
          </Link>
        </div>
      </div>
    );
  }

  // 转换消息格式
  const messages: Message[] = conversation.messages.map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: msg.content,
    thought: msg.thought,
  }));

  return (
    <ChatView
      initialMessages={messages}
      initialConversationId={conversation.id}
    />
  );
}
