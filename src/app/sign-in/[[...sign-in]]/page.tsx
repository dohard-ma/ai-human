"use client";

import { useTransition, useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setIsSent(true);
      }
    });
  };

  if (isSent) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background p-4 animate-in fade-in duration-500">
        <Card className="w-full max-w-md border-none shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="text-center pt-10">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <span className="text-3xl">✨</span>
            </div>
            <CardTitle className="text-3xl font-black tracking-tight mb-2">
              邮件已发出
            </CardTitle>
            <CardDescription className="text-base text-balance px-4">
              我们已向{" "}
              <span className="font-bold text-foreground">
                {/* 邮箱脱敏逻辑可加在这里 */}
              </span>{" "}
              发送了登录链接。
              请检查收件箱（包括垃圾箱），点击链接即可进入系统。
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 text-center">
            <p className="text-sm text-muted-foreground">
              没收到邮件？请稍等几分钟或重新尝试。
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">登录 / 注册</CardTitle>
          <CardDescription>
            输入您的邮箱，我们将通过邮件发送登录链接。
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                disabled={isPending}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "发送中..." : "发送登录链接"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
