"use client";

import { ChevronLeft, Phone, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label="返回"
        >
          <ChevronLeft className="size-6" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-base font-semibold text-foreground/90 leading-tight">
          挖掘天赋与卡点诊断
        </h1>
        <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
          内容由 AI 生成 <ChevronLeft className="size-3 rotate-180" />
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label="打电话"
        >
          <Phone className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-blue-500"
          aria-label="播放语音"
        >
          <Volume2 className="size-5" />
        </Button>
      </div>
    </header>
  );
}
