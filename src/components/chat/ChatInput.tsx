"use client";

import { Mic, ArrowUp, RotateCcw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

// 最大高度阈值（超过此高度显示滚动条）
const MAX_HEIGHT = 200;

export function ChatInput({
  onSend,
  disabled,
  placeholder = "分享一段经历，深度挖掘潜能...",
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | "auto">("auto");
  const [showScrollbar, setShowScrollbar] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue.trim());
      setInputValue("");
      setTextareaHeight("auto");
      setShowScrollbar(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 计算文本高度
  useEffect(() => {
    if (hiddenRef.current) {
      // 使用隐藏的 div 来精确计算文本高度
      hiddenRef.current.textContent = inputValue || placeholder;
      const scrollHeight = hiddenRef.current.scrollHeight;

      if (scrollHeight > MAX_HEIGHT) {
        setTextareaHeight(MAX_HEIGHT);
        setShowScrollbar(true);
      } else {
        setTextareaHeight(scrollHeight);
        setShowScrollbar(false);
      }
    }
  }, [inputValue, placeholder]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <footer className="p-4 md:pb-6 md:pt-4 safe-area-bottom shrink-0 bg-background">
      <div className="max-w-2xl mx-auto">
        {/* Input Container - Flex column layout */}
        <div className="relative bg-muted border border-border rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-card transition-all flex flex-col">
          {/* Floating Voice Recording UI - 相对于输入框居中 */}
          {isRecording && (
            <div className="absolute inset-x-0 -top-14 z-20 w-full flex justify-center pointer-events-none">
              <button
                onClick={toggleRecording}
                className="pointer-events-auto bg-emerald-800 dark:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold animate-float ring-4 ring-emerald-900/10"
              >
                <div className="size-2.5 bg-white rounded-sm animate-stop-pulse" />
                <span>正在倾听... 点击停止</span>
              </button>
            </div>
          )}
          {/* Hidden div for measuring text height */}
          <div
            ref={hiddenRef}
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none px-4 text-sm leading-relaxed whitespace-pre-wrap break-words"
            style={{ width: "calc(100% - 2rem)", minHeight: "1.5rem" }}
          />

          {/* Textarea - 独立区域，不与按钮重叠 */}
          <div className="px-4 pt-4">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={disabled ? "AI 正在思考..." : placeholder}
              disabled={disabled}
              className={cn(
                "w-full bg-transparent border-none focus:outline-none resize-none text-sm leading-relaxed",
                showScrollbar ? "overflow-y-auto" : "overflow-hidden",
              )}
              style={{
                height:
                  typeof textareaHeight === "number"
                    ? `${textareaHeight}px`
                    : "auto",
                minHeight: "1.5rem",
                maxHeight: `${MAX_HEIGHT}px`,
                scrollbarWidth: showScrollbar ? "thin" : "none",
              }}
            />
          </div>

          {/* Bottom Action Bar - 完全独立的区域 */}
          <div className="px-2 py-2 flex items-center justify-between border-t border-transparent">
            {/* Left Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleRecording}
                aria-label="语音输入"
                disabled={disabled}
                className={cn(
                  "size-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-accent transition-all active:scale-90",
                  isRecording &&
                    "text-emerald-700 bg-emerald-50 dark:bg-emerald-950",
                )}
              >
                <Mic className="size-5" />
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleSend}
                disabled={disabled || !inputValue.trim()}
                aria-label="发送消息"
                className={cn(
                  "size-9 flex items-center justify-center rounded-xl font-semibold transition-all shrink-0",
                  inputValue.trim() || disabled
                    ? "bg-primary text-primary-foreground shadow-sm active:scale-95"
                    : "bg-black/5 dark:bg-white/5 text-muted-foreground cursor-not-allowed",
                )}
              >
                {disabled ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <RotateCcw className="size-4" />
                  </motion.div>
                ) : (
                  <ArrowUp className="size-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-[10px] text-center text-muted-foreground mt-3 mb-2 opacity-60 tabular-nums font-mono uppercase tracking-tighter">
          AI 洞察将随谈话深入而校准
        </p>
      </div>
    </footer>
  );
}
