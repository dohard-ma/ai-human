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
          "flex items-end gap-2 max-w-[85%]",
          isUser ? "flex-row-reverse" : "flex-row",
        )}
      >
        {/* Avatar Placeholder */}
        <div
          className={cn(
            "size-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
            isUser ? "bg-blue-600" : "bg-zinc-800",
          )}
        >
          {isUser ? (
            <svg viewBox="0 0 24 24" className="size-5 text-white fill-current">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="size-5 text-blue-400 fill-none stroke-current stroke-2"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          )}
        </div>

        <div
          className={cn(
            "rounded-3xl px-6 py-3.5 text-[15px] shadow-2xl transition-all duration-300",
            isUser
              ? "bg-white text-zinc-900 font-medium"
              : "bg-zinc-900 text-zinc-100 border border-zinc-800/50",
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
