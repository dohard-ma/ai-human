"use client";

import {
  Camera,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ChatInput() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/20 p-4 pb-10 space-y-4 max-w-2xl mx-auto">
      {/* Input Main */}
      <div className="flex items-center gap-3">
        {/* Left Camera */}
        <button
          className="p-2 rounded-full hover:bg-secondary transition-colors shrink-0"
          aria-label="相机"
        >
          <Camera className="size-7 text-foreground/70" />
        </button>

        {/* Center Input Area */}
        <div className="flex-1 relative flex items-center bg-secondary rounded-2xl px-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="发送消息..."
            className="w-full h-12 bg-transparent border-none focus:ring-0 px-4 text-base text-foreground placeholder:text-foreground/30"
          />
        </div>

        {/* Right Send Button (Optional) */}
        {inputValue.length > 0 && (
          <button className="h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all active:scale-95 shrink-0">
            发送
          </button>
        )}
      </div>
    </div>
  );
}
