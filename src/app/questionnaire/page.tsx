"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { useAudio, useSoundEffect } from "@/hooks/use-audio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    Volume2,
    VolumeX,
    Mic,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Lock,
    Clock,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserInfo {
    name: string;
    age: string;
    occupation: string;
}

// 价值主张文案数组（后续可由 AI 动态生成）
const CONVERSION_MESSAGES = [
    "用 ¥49 换去一年半的迷茫",
    "投资自己，从了解自己开始",
    "2,847 位用户已经找到方向",
    "别让天赋被埋没",
];

export default function QuestionnairePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [stage, setStage] = useState<"info" | "questionnaire" | "complete">(
        "info"
    );
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: "",
        age: "",
        occupation: "",
    });
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    const {
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        answers,
        updateAnswer,
        goNextQuestion,
        goPrevQuestion,
        isFirstQuestion,
        isLastQuestion,
        canSubmitQuestion,
        getAllAnswers,
    } = useQuestionnaire();

    // 背景音乐
    const backgroundMusic = useAudio("/fb-med-music-short-low.m4a", {
        loop: true,
        volume: 0.3,
        autoPlay: false,
    });

    // 点击音效
    const clickSound = useSoundEffect("/zen-tone-mid-2025561-02.mp3", 0.4);

    // 价值主张文案自动轮播
    useEffect(() => {
        // 仅在完成页面时启动轮播
        if (stage !== "complete") return;

        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % CONVERSION_MESSAGES.length);
        }, 4000); // 每4秒切换一次

        return () => clearInterval(interval);
    }, [stage]);

    // 开始问卷
    const handleStartQuestionnaire = () => {
        if (!userInfo.name.trim() || !userInfo.age.trim() || !userInfo.occupation.trim()) {
            return;
        }

        // 播放音效和背景音乐
        setTimeout(() => {
            clickSound.play();
            backgroundMusic.play();
        }, 100);

        setStage("questionnaire");
    };

    // 提交当前问题
    const handleSubmitQuestion = () => {
        if (!canSubmitQuestion) return;

        // 播放点击音效
        clickSound.play();

        if (isLastQuestion) {
            // 最后一题,完成问卷
            setStage("complete");
        } else {
            goNextQuestion();
        }
    };

    // 切换音乐（控制所有音频）
    const toggleMusic = () => {
        if (backgroundMusic.isMuted) {
            // 取消静音
            backgroundMusic.toggleMute();
            clickSound.setIsMuted(false);
        } else {
            // 静音
            backgroundMusic.toggleMute();
            clickSound.setIsMuted(true);
        }
    };

    // 提交整个问卷
    const handleSubmitAll = async () => {
        clickSound.play();

        const allAnswers = getAllAnswers();
        console.log("User Info:", userInfo);
        console.log("All Answers:", allAnswers);

        // 如果用户已登录，直接生成报告并跳转
        if (session?.user) {
            setIsGenerating(true);

            // TODO: 调用 API 生成报告
            // 模拟生成过程
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // 跳转到天赋存档页面
            router.push("/archives");
        } else {
            // 未登录用户，保持当前页面（显示付费提示）
            // 不做任何操作，用户会看到付费界面
        }
    };

    // 基础信息收集阶段
    if (stage === "info") {
        return (
            <div className="min-h-dvh bg-background">
                {/* 顶部音乐按钮 */}
                <div className="flex justify-center px-6 py-3">
                    <div className="max-w-2xl w-full flex justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-10"
                            onClick={toggleMusic}
                            aria-label={backgroundMusic.isMuted ? "开启音乐" : "关闭音乐"}
                        >
                            {backgroundMusic.isMuted ? (
                                <VolumeX className="size-5 text-muted-foreground" />
                            ) : (
                                <Volume2 className="size-5 text-primary" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* 主要内容 */}
                <div className="flex justify-center px-6 py-8">
                    <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-500">
                        {/* 标题 */}
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight h-serif">
                                开始你的
                            </h1>
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary leading-tight h-serif italic">
                                天赋发现之旅
                            </h2>
                        </div>

                        {/* 表单 */}
                        <div className="space-y-5">
                            {/* 姓名 */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    如何称呼您？
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="请输入您的称呼"
                                    value={userInfo.name}
                                    onChange={(e) =>
                                        setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="h-11 text-base"
                                />
                            </div>

                            {/* 年龄 */}
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm font-medium">
                                    您的年龄
                                </Label>
                                <Input
                                    id="age"
                                    type="text"
                                    placeholder="例如: 25"
                                    value={userInfo.age}
                                    onChange={(e) =>
                                        setUserInfo((prev) => ({ ...prev, age: e.target.value }))
                                    }
                                    className="h-11 text-base"
                                />
                            </div>

                            {/* 职业 */}
                            <div className="space-y-2">
                                <Label htmlFor="occupation" className="text-sm font-medium">
                                    您的职业
                                </Label>
                                <Input
                                    id="occupation"
                                    type="text"
                                    placeholder="例如: 设计师"
                                    value={userInfo.occupation}
                                    onChange={(e) =>
                                        setUserInfo((prev) => ({
                                            ...prev,
                                            occupation: e.target.value,
                                        }))
                                    }
                                    className="h-11 text-base"
                                />
                            </div>
                        </div>

                        {/* 按钮 */}
                        <div className="pt-2">
                            <Button
                                onClick={handleStartQuestionnaire}
                                disabled={
                                    !userInfo.name.trim() ||
                                    !userInfo.age.trim() ||
                                    !userInfo.occupation.trim()
                                }
                                size="lg"
                                className="w-full h-12 text-base font-semibold rounded-xl"
                            >
                                <Sparkles className="size-5 mr-2" />
                                开始探索
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 完成阶段
    if (stage === "complete") {
        return (
            <div className="min-h-dvh bg-background">
                {/* 顶部返回按钮 */}
                <div className="border-b border-border">
                    <div className="max-w-3xl mx-auto flex items-center px-6 py-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                clickSound.play();
                                setStage("questionnaire");
                            }}
                            aria-label="返回修改答案"
                        >
                            <ArrowLeft className="size-5" />
                        </Button>
                    </div>
                </div>

                {/* 主要内容 - 可滚动 */}
                <div className="max-w-3xl mx-auto px-6 py-8 pb-96">
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* 完成状态 */}
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 animate-in zoom-in duration-300">
                                <CheckCircle2 className="size-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-3xl sm:text-4xl font-bold text-foreground h-serif">
                                    问卷已完成！
                                </h1>
                                <p className="text-base text-muted-foreground">
                                    您的深度自我探索即将开启
                                </p>
                            </div>
                        </div>

                        {/* 价值主张卡片 */}
                        <div className="bg-linear-to-br from-primary/5 via-primary/3 to-background border border-primary/20 rounded-2xl p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <Sparkles className="size-6 text-primary shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-foreground">
                                        AI 将为您生成专属天赋分析报告
                                    </h2>
                                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                                        基于您的 {Object.keys(getAllAnswers()).length} 个深度回答，AI 将深入分析您的天赋特质、思维模式和成长潜力，为您提供个性化的职业发展建议。
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 报告包含内容 */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                您将获得：
                            </h3>
                            <div className="grid gap-3">
                                {[
                                    {
                                        icon: "🎯",
                                        title: "天赋识别分析",
                                        desc: "发现您独特的天赋优势和核心竞争力",
                                    },
                                    {
                                        icon: "🧠",
                                        title: "思维模式解析",
                                        desc: "了解您的思考方式和决策偏好",
                                    },
                                    {
                                        icon: "📈",
                                        title: "成长路径规划",
                                        desc: "个性化的职业发展建议和行动方案",
                                    },
                                    {
                                        icon: "💡",
                                        title: "潜能开发指导",
                                        desc: "突破瓶颈的具体方法和实践建议",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50 animate-in slide-in-from-bottom duration-300"
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                    >
                                        <span className="text-2xl shrink-0">{item.icon}</span>
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-foreground text-sm">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground text-pretty">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 社会证明 */}
                        <div className="bg-secondary/20 border border-border rounded-xl p-5 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="size-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                                        >
                                            <span className="text-xs font-semibold text-primary">
                                                {String.fromCharCode(64 + i)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                    已有 <span className="text-primary font-bold">2,847</span> 位用户获得了深度洞察
                                </p>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-base">⭐️</span>
                                <p className="text-xs leading-relaxed text-pretty">
                                    &ldquo;这份报告让我第一次真正了解自己的优势，找到了适合自己的职业方向。强烈推荐！&rdquo;
                                    <span className="text-muted-foreground/70 ml-1">— 张女士, 产品经理</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部固定价格区 - 仅未登录用户显示 */}
                {!session?.user && !isGenerating && (
                    <div className="fixed bottom-28 left-0 right-0 flex justify-center px-6 py-5 bg-background/98 backdrop-blur-xl shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.12)]">
                        <div className="max-w-3xl w-full space-y-4">
                            {/* 价值主张文案 */}
                            <div className="flex justify-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg transition-all duration-300">
                                    <Clock className="size-4 text-primary shrink-0" />
                                    <p className="text-sm font-medium text-foreground animate-in fade-in duration-500">
                                        {CONVERSION_MESSAGES[currentMessageIndex]}
                                    </p>
                                </div>
                            </div>
                            {/* 价格和优惠 */}
                            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-5 space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <div className="space-y-1">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-primary tabular-nums">
                                                ¥49
                                            </span>
                                            <span className="text-lg text-muted-foreground line-through tabular-nums">
                                                ¥199
                                            </span>
                                        </div>

                                    </div>
                                    <div className="ml-auto">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
                                            <span>🔥</span>
                                            <span>限时 75% OFF</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="size-4 text-primary" />
                                    <span>一次付费，永久查看</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 生成中状态提示 - 已登录用户点击后显示 */}
                {session?.user && isGenerating && (
                    <div className="fixed bottom-28 left-0 right-0 flex justify-center px-6 py-5 bg-background/98 backdrop-blur-xl shadow-[0_-8px_24px_-4px_rgba(0,0,0,0.12)]">
                        <div className="max-w-3xl w-full">
                            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-6 space-y-3">
                                <div className="flex items-center justify-center gap-3">
                                    <Loader2 className="size-6 text-primary animate-spin" />
                                    <p className="text-lg font-semibold text-foreground">
                                        天赋报告正在生成中...
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground text-center text-pretty">
                                    AI 正在深度分析您的回答，请稍候
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 底部固定按钮 */}
                <div className="fixed bottom-0 left-0 right-0 flex justify-center px-6 pt-3 pb-6 bg-background/98 backdrop-blur-xl safe-area-bottom">
                    <div className="max-w-3xl w-full space-y-3">
                        <Button
                            onClick={handleSubmitAll}
                            disabled={isGenerating}
                            size="lg"
                            className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="size-5 mr-2 animate-spin" />
                                    生成中...
                                </>
                            ) : session?.user ? (
                                <>
                                    <Sparkles className="size-5 mr-2" />
                                    生成我的天赋报告
                                </>
                            ) : (
                                <>
                                    <Lock className="size-5 mr-2" />
                                    解锁我的完整天赋
                                </>
                            )}
                        </Button>

                        {!isGenerating && (
                            <Button
                                onClick={() => {
                                    clickSound.play();
                                    setStage("questionnaire");
                                }}
                                variant="ghost"
                                size="sm"
                                className="w-full text-sm text-muted-foreground hover:text-foreground"
                            >
                                返回修改答案
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 问卷回答阶段
    if (!currentQuestion) {
        return null;
    }

    const currentAnswer = answers[currentQuestion.id] || "";

    return (
        <div className="min-h-dvh bg-background flex flex-col">
            {/* 顶部导航栏 */}
            <div className="border-b border-border bg-background/80 backdrop-blur-lg">
                <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            clickSound.play();
                            goPrevQuestion();
                        }}
                        disabled={isFirstQuestion}
                        aria-label="返回上一题"
                    >
                        <ArrowLeft className="size-5" />
                    </Button>

                    {/* 进度指示器 */}
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: totalQuestions }).map((_, idx) => {
                            const isActive = idx <= currentQuestionIndex;
                            const isCurrent = idx === currentQuestionIndex;
                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "h-1 rounded-full transition-all duration-300",
                                        isCurrent
                                            ? "w-8 bg-primary"
                                            : isActive
                                                ? "w-6 bg-primary/60"
                                                : "w-6 bg-border"
                                    )}
                                />
                            );
                        })}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMusic}
                        aria-label={backgroundMusic.isMuted ? "开启音乐" : "关闭音乐"}
                    >
                        {backgroundMusic.isMuted ? (
                            <VolumeX className="size-5 text-muted-foreground" />
                        ) : (
                            <Volume2 className="size-5 text-primary" />
                        )}
                    </Button>
                </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-1 flex justify-center overflow-auto">
                <div className="max-w-2xl w-full px-6 py-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* 问题区域 */}
                    <div className="space-y-4">
                        {/* 问题编号 + 标题标签 */}
                        <div className="flex items-center gap-2">
                            <span className="text-primary text-sm font-semibold tabular-nums">
                                {currentQuestion.id}.
                            </span>
                            <span className="text-foreground font-semibold text-base">
                                {currentQuestion.title}
                            </span>
                            <span className="text-muted-foreground text-xs font-medium">
                                {currentQuestion.subtitle}
                            </span>
                            {/* 选填标记 */}
                            {!currentQuestion.required && (
                                <span className="inline-flex items-center px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                                    选填
                                </span>
                            )}
                        </div>

                        {/* 问题内容 - 核心主问题 */}
                        <div>
                            <p className="text-xl text-foreground font-medium leading-snug text-pretty">
                                {currentQuestion.content}
                            </p>
                        </div>

                        {/* 提示文字 */}
                        {currentQuestion.hint && (
                            <div>
                                <p className="text-muted-foreground text-sm leading-normal text-pretty whitespace-pre-wrap">
                                    {currentQuestion.hint}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 输入区域 */}
                    <div className="relative space-y-6">
                        <div className="relative">
                            <textarea
                                value={currentAnswer}
                                onChange={(e) => updateAnswer(currentQuestion.id, e.target.value)}
                                placeholder="在这里讲述你的故事..."
                                className={cn(
                                    "w-full h-[160px] bg-transparent text-foreground text-base leading-relaxed",
                                    "placeholder:text-muted-foreground/50 resize-none outline-none",
                                    "border-0 focus:ring-0 p-0"
                                )}
                                autoFocus
                            />

                            {/* 右下角弧形装饰 */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                                <svg
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    className="w-full h-full"
                                >
                                    <path
                                        d="M 32 8 Q 32 32 8 32"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-border opacity-30"
                                    />
                                </svg>
                            </div>

                            {/* 浮动麦克风按钮 */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute bottom-4 right-4 size-12 rounded-full bg-secondary/80 hover:bg-secondary"
                                aria-label="语音输入"
                            >
                                <Mic className="size-5" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-end">
                            <span className="text-xs text-muted-foreground tabular-nums">
                                {currentAnswer.length} 字
                            </span>
                        </div>
                    </div>

                    {/* 提交按钮 */}
                    <div className="pt-4 pb-8">
                        <Button
                            onClick={handleSubmitQuestion}
                            disabled={!canSubmitQuestion}
                            size="lg"
                            className="w-full h-14 text-base font-semibold rounded-xl group"
                        >
                            {isLastQuestion ? "完成问卷" : "下一题"}
                            <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
