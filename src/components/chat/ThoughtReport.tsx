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
    <div className="group">
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="size-2 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
          Socratic Probe
        </span>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden p-6 transition-all duration-300 hover:bg-zinc-900/60 shadow-2xl backdrop-blur-sm">
        {/* Thinking Status Header */}
        <div
          className="flex items-center justify-between mb-4 cursor-pointer select-none group/header"
          onClick={toggleExpanded}
        >
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1 group-hover/header:text-zinc-200 transition-colors">
            {status === "completed"
              ? "DIAGNOSTIC COMPLETE"
              : "DEEP NEURAL SIFTING..."}{" "}
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-300",
                expanded && "rotate-90",
              )}
            />
          </span>
          <div className="text-[9px] font-mono text-zinc-600 tracking-tighter">
            BETA-CORE_V2.5
          </div>
        </div>

        {/* Thought Process */}
        <div className="relative">
          <div
            ref={thoughtRef}
            className={cn(
              "text-[14px] leading-relaxed text-zinc-400 font-medium break-words transition-[max-height] duration-500 ease-in-out overflow-hidden italic",
              expanded ? "max-h-[2000px]" : "max-h-[60px]",
            )}
          >
            "{thought}"
          </div>

          <AnimatePresence>
            {!expanded && needsExpand && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 pt-8 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"
              >
                <button
                  onClick={toggleExpanded}
                  className="w-full text-center text-[10px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors py-1 uppercase tracking-widest"
                >
                  View Core Logic
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer Section */}
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 pt-6 border-t border-zinc-800/80"
          >
            <div className="text-[16px] leading-[1.6] text-zinc-100 font-medium break-words">
              <Markdown content={answer} />
            </div>

            {/* Action & Metadata Footer */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[
                  { icon: Copy, label: "复制" },
                  { icon: Share2, label: "分享" },
                  { icon: Bookmark, label: "收藏" },
                  { icon: Volume2, label: "播放" },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="p-2.5 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-90"
                    title={action.label}
                  >
                    <action.icon className="size-4" />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-[10px] font-mono text-blue-500/80 font-bold tracking-widest">
                  ROI CALC: ACTIVE
                </div>
                <div className="text-[10px] font-mono text-zinc-600">10:03</div>
                <button className="p-2.5 rounded-xl text-zinc-600 hover:text-white hover:bg-zinc-800 transition-all">
                  <RotateCcw className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
