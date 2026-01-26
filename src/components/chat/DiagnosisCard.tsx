"use client";

import { AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosisCardProps {
  title: string;
  titleEn?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * 卡点诊断卡片组件
 * 用于展示 AI 诊断出的问题或挑战
 */
export function DiagnosisCard({
  title,
  titleEn,
  description,
  actionLabel = "查看破解建议",
  onAction,
  className,
}: DiagnosisCardProps) {
  return (
    <div
      className={cn(
        "ml-12 p-5 border border-border bg-card rounded-2xl space-y-3",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <AlertCircle className="size-3.5" strokeWidth={2.5} />
        卡点诊断
      </div>
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-balance">
          {title}
          {titleEn && (
            <span className="font-normal text-muted-foreground">
              {" "}
              ({titleEn})
            </span>
          )}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
          {description}
        </p>
      </div>
      {onAction && (
        <div className="pt-2 border-t border-border">
          <button
            onClick={onAction}
            className="text-[11px] font-bold text-emerald-700 dark:text-emerald-500 hover:opacity-80 uppercase tracking-wider flex items-center gap-1 transition-all"
          >
            {actionLabel}
            <ChevronRight className="size-3" strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
}
