"use client";

import { cn } from "@/lib/utils";

interface InteractionOption {
  label: string;
  value: string;
}

interface InteractionCardProps {
  question: string;
  options: InteractionOption[];
  onSelect?: (value: string) => void;
  className?: string;
}

/**
 * 互动选择卡片组件
 * 用于展示问题和多个可选按钮，引导用户进行选择
 */
export function InteractionCard({
  question,
  options,
  onSelect,
  className,
}: InteractionCardProps) {
  return (
    <div
      className={cn(
        "ml-12 p-5 border border-border rounded-2xl space-y-4 bg-card shadow-sm",
        className,
      )}
    >
      <h3 className="text-sm font-bold text-pretty">{question}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect?.(option.value)}
            className="px-4 py-1.5 border border-border rounded-xl text-xs font-semibold hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all bg-background active:scale-95"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
