"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, LogIn } from "lucide-react";

export function FooterCTA() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Message */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
          天赋不是用来炫耀的标签
          <br />
          <span className="text-primary">而是用来发挥的力量</span>
        </h2>

        {/* Sub Message */}
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-pretty">
          前 10 次对话免费，限时生成初版报告。
          <br />
          现在开始，找到属于你的天赋密码。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-14 px-10 text-base font-bold rounded-xl"
            asChild
          >
            <Link href="/sign-in">
              <Sparkles className="size-5 mr-2" />
              免费开始第一次对话
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-10 text-base rounded-xl"
            asChild
          >
            <Link href="/sign-in">
              <LogIn className="size-5 mr-2" />
              登录我的天赋档案
            </Link>
          </Button>
        </div>

        {/* Trust Note */}
        <p className="mt-8 text-xs text-muted-foreground">
          * 目前仅限邀请用户访问，请使用邀请码注册
        </p>
      </div>
    </section>
  );
}
