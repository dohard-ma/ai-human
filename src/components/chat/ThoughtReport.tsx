"use client";

import {
  ChevronRight,
  Copy,
  Share2,
  Bookmark,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Markdown } from "./Markdown";

export type State = "thinking" | "completed";

interface ThoughtReportProps {
  thought: string;
  answer?: string;
  status?: State;
  className?: string;
  /** 受控模式：展开状态 */
  isExpanded?: boolean;
  /** 受控模式：展开状态变化回调 */
  onExpandedChange?: (expanded: boolean) => void;
}

// 固定展示高度（单位: px）
const COLLAPSED_HEIGHT = 60;

export function ThoughtReport({
  thought,
  answer,
  status = "completed",
  className,
  isExpanded: controlledExpanded,
  onExpandedChange,
}: ThoughtReportProps) {
  // 支持受控和非受控模式
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const [needsExpand, setNeedsExpand] = useState(false);
  const thoughtRef = useRef<HTMLDivElement>(null);

  // 切换展开状态
  const toggleExpanded = () => {
    const newValue = !expanded;
    if (onExpandedChange) {
      onExpandedChange(newValue);
    }
    if (!isControlled) {
      setInternalExpanded(newValue);
    }
  };

  // 检测内容是否超过固定高度
  useEffect(() => {
    if (thoughtRef.current) {
      setNeedsExpand(thoughtRef.current.scrollHeight > COLLAPSED_HEIGHT);
    }
  }, [thought]);

  return (
    <div className={cn("ai-message-container", className)}>
      {/* AI Avatar */}
      <div className="ai-avatar-wrapper">
        <div className="size-8 rounded-lg bg-emerald-900 dark:bg-emerald-600 flex items-center justify-center text-white">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <path d="M19 3v4" />
            <path d="M21 5h-4" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4 min-w-0">
        {/* Thinking Process (Collapsible) */}
        <details className="group/think" open={expanded}>
          <summary
            onClick={(e) => {
              e.preventDefault();
              toggleExpanded();
            }}
            className="text-xs font-medium text-muted-foreground cursor-pointer list-none flex items-center gap-1.5 hover:text-foreground transition-colors select-none"
          >
            <ChevronRight
              className={cn(
                "size-3 transition-transform",
                expanded && "rotate-90",
              )}
              strokeWidth={3}
            />
            <span>{status === "thinking" ? "正在思考" : "思考过程"}</span>
            {status === "thinking" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3.5 ml-0.5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4" />
                <path d="m16.2 4.2 2.8 2.8" />
                <path d="M18 12h4" />
                <path d="m16.2 19.8 2.8-2.8" />
                <path d="M12 18v4" />
                <path d="m4.8 19.8 2.8-2.8" />
                <path d="M2 12h4" />
                <path d="m4.8 4.2 2.8 2.8" />
              </svg>
            )}
          </summary>
          <div
            ref={thoughtRef}
            className={cn(
              "mt-2 pl-3 border-l-2 border-border text-xs leading-relaxed text-muted-foreground transition-[max-height] duration-500 ease-in-out overflow-hidden text-pretty",
              expanded ? "max-h-[2000px]" : "max-h-[60px] line-clamp-3",
            )}
          >
            {thought}
          </div>
        </details>

        {/* Answer Section */}
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-muted p-4 rounded-2xl border border-border shadow-sm"
          >
            <div className="text-[15px] leading-relaxed text-pretty">
              <Markdown content={answer} />
            </div>

            {/* Action & Metadata Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[
                  { icon: Copy, label: "复制" },
                  { icon: Share2, label: "分享" },
                  // { icon: Bookmark, label: "收藏" },
                  // { icon: Volume2, label: "播放" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all active:scale-90"
                    title={action.label}
                  >
                    <action.icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
