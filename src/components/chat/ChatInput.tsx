"use client";

import { Camera, RotateCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void;
  disabled?: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSend(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 bg-[#0a0a0a]">
      <div className="relative flex items-center gap-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-2 shadow-2xl backdrop-blur-md">
        {/* Left Camera */}
        <button
          className="p-3 rounded-xl hover:bg-zinc-800 transition-colors shrink-0 group text-zinc-500 hover:text-white"
          aria-label="相机"
          disabled={disabled}
        >
          <Camera className="size-6 transition-transform group-hover:scale-110" />
        </button>

        {/* Center Input Area */}
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "AI 正在思考..." : "沉浸式输入..."}
            disabled={disabled}
            className="w-full h-11 bg-transparent border-none focus:outline-none focus:ring-0 px-2 text-[15px] text-zinc-100 placeholder:text-zinc-600"
          />
        </div>

        {/* Right Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !inputValue.trim()}
          className={cn(
            "size-11 flex items-center justify-center rounded-xl font-semibold transition-all shrink-0",
            inputValue.trim() || disabled
              ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 active:scale-95"
              : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed",
          )}
        >
          {disabled ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RotateCcw className="size-5" />
            </motion.div>
          ) : (
            <svg viewBox="0 0 24 24" className="size-5 fill-current">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
