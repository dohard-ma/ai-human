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
const COLLAPSED_HEIGHT = 80;

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full mb-6", className)}
    >
      <div className="bg-background dark:bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden p-5">
        {/* Thinking Status Header */}
        <div
          className="flex items-center justify-between mb-3 cursor-pointer select-none"
          onClick={toggleExpanded}
        >
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-0.5">
            {status === "completed" ? "已完成思考" : "深度思考中"}{" "}
            <ChevronRight
              className={cn(
                "size-4 transition-transform duration-200",
                expanded && "rotate-90",
              )}
            />
          </span>
        </div>

        {/* Thought Process - 默认展示固定高度 */}
        <div className="relative">
          <div
            ref={thoughtRef}
            className={cn(
              "text-[15px] leading-relaxed text-muted-foreground break-words transition-[max-height] duration-300 ease-in-out overflow-hidden",
              expanded ? "max-h-[2000px]" : "max-h-[80px]",
            )}
          >
            {thought}
          </div>

          {/* 渐变遮罩和展开全部按钮 */}
          <AnimatePresence>
            {!expanded && needsExpand && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 pt-8 bg-gradient-to-t from-background dark:from-card to-transparent"
              >
                <button
                  onClick={toggleExpanded}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  展开全部
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer Section with Markdown */}
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 pt-4 border-t border-dashed border-border"
          >
            <div className="text-[17px] leading-relaxed text-foreground break-words">
              <Markdown content={answer} />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {[
                  { icon: Copy, label: "复制" },
                  { icon: Volume2, label: "播放" },
                  { icon: Bookmark, label: "收藏" },
                  { icon: Share2, label: "分享" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                    title={action.label}
                  >
                    <action.icon className="size-5" />
                  </button>
                ))}
              </div>

              <button className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
                <RotateCcw className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
