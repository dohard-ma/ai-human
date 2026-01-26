"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationItem {
  id: string;
  title: string | null;
  updatedAt: Date;
  messages: { content: string }[];
}

interface AuthLayoutClientProps {
  children: React.ReactNode;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles: string[];
    canInvite: boolean;
  };
  conversations?: ConversationItem[];
  headerTitle?: string;
}

export function AuthLayoutClient({
  children,
  user,
  conversations = [],
  headerTitle = "欢迎回来",
}: AuthLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-dvh bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        user={user}
        conversations={conversations}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 h-14 px-4 md:px-6 border-b border-border shrink-0 bg-background/80 backdrop-blur-md z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="打开侧边栏"
            className={cn(
              "p-1.5 rounded-lg hover:bg-muted transition-colors",
              sidebarOpen ? "hidden" : "flex",
            )}
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold truncate text-pretty">
              {headerTitle}
            </h2>
          </div>
        </header>

        {/* Page Content - Fill remaining space */}
        <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}
