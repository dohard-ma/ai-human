"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { requestVerificationCode, loginWithCode } from "@/app/actions/auth";
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
import { motion, AnimatePresence } from "motion/react";
import { Mail, ShieldCheck, Ticket, ArrowLeft, Loader2 } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const emailVal = formData.get("email") as string;
    const inviteVal = formData.get("inviteCode") as string;

    startTransition(async () => {
      const result = await requestVerificationCode(emailVal, mode, inviteVal);
      if (result?.error) {
        setError(result.error);
      } else {
        setEmail(emailVal);
        setInviteCode(inviteVal);
        setStep(2);
      }
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;

    startTransition(async () => {
      const result = await loginWithCode(email, code, inviteCode);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
              <CardHeader className="space-y-1">
                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <Ticket className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black tracking-tight uppercase">
                  {mode === "login" ? "登录" : "加入体验"}
                </CardTitle>
                <CardDescription className="text-pretty">
                  {mode === "login"
                    ? "输入你的邮箱，获取验证码登录。"
                    : "请输入你的邮箱和邀请码，开启天赋探索之旅。"}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSendCode}>
                <CardContent className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2"
                    >
                      <ShieldCheck className="size-4" />
                      {error}
                    </motion.div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱地址</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10 h-11"
                        required
                        defaultValue={email}
                        disabled={isPending}
                      />
                    </div>
                  </div>
                  {mode === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="inviteCode">邀请码</Label>
                      <div className="relative">
                        <Ticket className="absolute left-3 top-3 size-4 text-muted-foreground" />
                        <Input
                          id="inviteCode"
                          name="inviteCode"
                          type="text"
                          placeholder="请输入邀请码"
                          className="pl-10 h-11"
                          required
                          defaultValue={inviteCode}
                          disabled={isPending}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground px-1">
                        * 内部测试阶段需要邀请码访问
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        发送验证码...
                      </>
                    ) : (
                      "获取验证码"
                    )}
                  </Button>
                  <div className="text-sm text-center text-muted-foreground">
                    {mode === "login" ? (
                      <>
                        还没有账号？{" "}
                        <button
                          type="button"
                          onClick={() => setMode("register")}
                          className="text-primary font-semibold hover:underline"
                        >
                          立即注册
                        </button>
                      </>
                    ) : (
                      <>
                        已有账号？{" "}
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-primary font-semibold hover:underline"
                        >
                          直接登录
                        </button>
                      </>
                    )}
                  </div>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
              <CardHeader className="space-y-1 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-4 size-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setStep(1)}
                  disabled={isPending}
                  aria-label="返回上一步"
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <ShieldCheck className="size-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-black tracking-tight text-center">
                  输入验证码
                </CardTitle>
                <CardDescription className="text-center text-pretty">
                  验证码已发送至{" "}
                  <span className="text-foreground font-medium">{email}</span>
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                      <ShieldCheck className="size-4" />
                      {error}
                    </div>
                  )}
                  <div className="space-y-2 text-center">
                    <Label htmlFor="code" className="sr-only">
                      验证码
                    </Label>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="· · · · · ·"
                      className="text-center text-3xl h-14 tracking-[0.5em] font-black placeholder:text-muted-foreground/30"
                      autoFocus
                      required
                      disabled={isPending}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {mode === "login" ? "正在登录..." : "正在注册..."}
                      </>
                    ) : mode === "login" ? (
                      "立即登录"
                    ) : (
                      "完成注册"
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    没收到邮件？检查垃圾箱或{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline font-medium"
                      onClick={() => setStep(1)}
                    >
                      返回重试
                    </button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
