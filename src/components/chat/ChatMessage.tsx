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
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-[16px] shadow-sm transition-colors",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-background text-foreground rounded-tl-none border border-border/50",
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
    </motion.div>
  );
}
