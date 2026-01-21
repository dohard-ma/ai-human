import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function WelcomePage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-xl w-full space-y-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">欢迎回来</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            这里是你的 Cockpit
            首页。登录后即可读取并管理你的任务、习惯、日志与想法。
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/sign-in">去登录</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-up">创建账号</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
