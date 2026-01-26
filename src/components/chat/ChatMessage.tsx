"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string | ReactNode;
  className?: string;
}

export function ChatMessage({ role, content, className }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "flex w-full mb-4 px-4",
        isUser ? "justify-end" : "justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "ai-message-container max-w-[85%]",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar */}
        <div className="ai-avatar-wrapper">
          <div
            className={cn(
              "size-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
              isUser ? "bg-primary" : "bg-emerald-900 dark:bg-emerald-600",
            )}
          >
            {isUser ? (
              <svg
                viewBox="0 0 24 24"
                className="size-5 text-primary-foreground fill-current"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <path d="M19 3v4" />
                <path d="M21 5h-4" />
              </svg>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "rounded-2xl px-6 py-4 text-[15px] shadow-sm transition-all duration-300",
            isUser
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted text-foreground border border-border",
          )}
        >
          {typeof content === "string" ? (
            <p className="whitespace-pre-wrap leading-relaxed text-pretty break-words">
              {content}
            </p>
          ) : (
            content
          )}
        </div>
      </div>
    </motion.div>
  );
}
