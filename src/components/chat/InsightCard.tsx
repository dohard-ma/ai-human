"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  titleEn?: string;
  description: string;
  className?: string;
}

/**
 * 天赋发现卡片组件
 * 用于展示 AI 发现的用户天赋
 */
export function InsightCard({
  title,
  titleEn,
  description,
  className,
}: InsightCardProps) {
  return (
    <div
      className={cn(
        "ml-12 p-5 border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl space-y-2",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
        <Sparkles className="size-3.5" strokeWidth={2.5} />
        天赋发现
      </div>
      <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 text-balance">
        {title}
        {titleEn && (
          <span className="font-normal text-emerald-700/70 dark:text-emerald-400/70">
            {" "}
            ({titleEn})
          </span>
        )}
      </h3>
      <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed text-pretty">
        {description}
      </p>
    </div>
  );
}
