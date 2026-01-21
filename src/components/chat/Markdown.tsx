"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        // 标题
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
        "prose-h1:mt-6 prose-h1:mb-3 prose-h2:mt-5 prose-h2:mb-2 prose-h3:mt-4 prose-h3:mb-2",
        // 段落和列表
        "prose-p:my-2 prose-p:leading-relaxed",
        "prose-ul:my-2 prose-ol:my-2",
        "prose-li:my-0.5",
        // 代码
        "prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
        "prose-code:bg-muted prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:text-sm prose-pre:rounded-lg prose-pre:p-3",
        // 链接
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        // 引用
        "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:not-italic",
        // 强调
        "prose-strong:text-foreground prose-strong:font-semibold",
        className,
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
