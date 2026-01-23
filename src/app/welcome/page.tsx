import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default async function WelcomePage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background text-foreground px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="max-w-xl w-full space-y-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-3">
          <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">
            探索你的内在天赋
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed text-pretty">
            通过对话来挖掘你的天赋
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Button
            size="lg"
            className="h-12 text-base font-bold rounded-xl"
            asChild
          >
            <Link href="/sign-in">立即开启体验</Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            * 目前仅限邀请用户访问
          </p>
        </div>
      </div>
    </div>
  );
}
