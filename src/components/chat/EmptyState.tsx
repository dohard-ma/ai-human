"use client";

import { cn } from "@/lib/utils";

interface SuggestionCard {
  category: string;
  text: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  suggestions?: SuggestionCard[];
  className?: string;
}

/**
 * 空白状态起步页组件
 * 用于无消息时的首页展示，显示欢迎语和快速建议卡片
 */
export function EmptyState({
  title = "今天想深入挖掘哪方面的天赋？",
  subtitle = `分享一段让你感到"心流"的经历，或者直接问我关于你核心能力的洞察。`,
  suggestions = [
    {
      category: "能力诊断",
      text: "帮我分析一下我在跨部门协作中的风格。",
    },
    {
      category: "职业建议",
      text: "根据我的天赋，有哪些更适合我的岗位？",
    },
  ],
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center min-h-full px-6 py-10 max-w-2xl mx-auto text-center",
        className,
      )}
    >
      {/* Icon */}
      <div className="size-16 bg-accent rounded-3xl flex items-center justify-center mb-8">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-800 dark:text-emerald-400"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-balance mb-4 tracking-tight h-serif">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground text-pretty mb-10 max-w-sm">
        {subtitle}
      </p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={suggestion.onClick}
            className="p-4 text-left border border-border rounded-2xl hover:bg-accent transition-all group active:scale-95 bg-card"
          >
            <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-500 mb-1">
              {suggestion.category}
            </span>
            <span className="text-sm text-pretty opacity-80">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
