"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Target, Lightbulb } from "lucide-react";

const talentTags = [
  { label: "洞察型", icon: Lightbulb, delay: "0s" },
  { label: "韧性型", icon: Zap, delay: "0.5s" },
  { label: "创造型", icon: Sparkles, delay: "1s" },
  { label: "影响型", icon: Target, delay: "1.5s" },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      {/* Floating Tags - Hidden on mobile to avoid blocking content */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        {talentTags.map((tag, index) => (
          <div
            key={tag.label}
            className="absolute animate-float opacity-60"
            style={{
              top: `${25 + index * 12}%`,
              left: index % 2 === 0 ? `${3 + index * 2}%` : "auto",
              right: index % 2 === 1 ? `${3 + index * 2}%` : "auto",
              animationDelay: tag.delay,
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full shadow-lg">
              <tag.icon className="size-4 text-primary" />
              <span className="text-sm font-medium">{tag.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="size-4" />
          <span>AI 驱动的天赋发现之旅</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-balance mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 h-serif">
          别让你的天赋沉睡
          <br />
          <span className="text-primary">发现你与生俱来的独特优势</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          基于 AI
          深度对话与五维度挖掘模型，不仅是一份报告，更是你从"迷茫"到"超级个体"的行动指南。
          <span className="block mt-2 font-medium text-foreground/80">
            拒绝内耗，开启心流人生。
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            size="lg"
            className="h-12 px-8 text-base font-bold rounded-xl"
            asChild
          >
            <Link href="/sign-in">
              <Sparkles className="size-5 mr-2" />
              立即开启挖掘之旅
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base rounded-xl"
            asChild
          >
            <a href="#sample-report">查看样本报告</a>
          </Button>
        </div>

        {/* Trust Indicator */}
        <p className="mt-8 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          已有 <span className="font-semibold text-foreground">1,200+</span>{" "}
          用户发现了自己的天赋密码
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
