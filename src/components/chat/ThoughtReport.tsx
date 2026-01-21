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
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ThoughtReportProps {
  thought: string;
  answer?: string;
  status?: "thinking" | "completed";
  className?: string;
}

export function ThoughtReport({
  thought,
  answer,
  status = "completed",
  className,
}: ThoughtReportProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full mb-6", className)}
    >
      <div className="bg-background dark:bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden p-5">
        {/* Thinking Status */}
        <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="text-sm font-medium text-muted-foreground flex items-center gap-0.5">
            {status === "completed" ? "已完成思考" : "深度思考中"}{" "}
            <ChevronRight className={cn("size-4 transition-transform", isExpanded && "rotate-90")} />
          </span>
        </div>

        {/* Thought Process */}
        <div className="relative">
          <div
            className={cn(
              "text-[15px] leading-relaxed text-muted-foreground overflow-hidden transition-all duration-500 ease-in-out break-words",
              !isExpanded ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100 pb-2",
            )}
          >
            {thought}
          </div>

          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 right-0 h-4 flex items-center"
              >
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Answer Section */}
        {answer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 pt-4 border-t border-dashed border-border"
          >
            <div className="text-[17px] leading-relaxed text-foreground whitespace-pre-wrap break-words">
              {answer}
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

              <button
                className="p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
              >
                <RotateCcw className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
