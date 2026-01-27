import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "天赋报告列表 - AI 天赋挖掘器",
    description: "查看你的所有天赋报告",
};

// 示例数据 - 实际应该从数据库获取
const mockReports = [
    {
        id: "1",
        title: "洞察型 × 韧性型",
        stage: "潜能期",
        createdAt: new Date("2026-01-20"),
        updatedAt: new Date("2026-01-25"),
        summary: "你的「人设」在朋友圈已是「想得明白」，说明天赋信号已外溢...",
    },
    {
        id: "2",
        title: "学习型 × 创意型",
        stage: "萌芽期",
        createdAt: new Date("2025-12-15"),
        updatedAt: new Date("2025-12-20"),
        summary: "享受从未知到掌握的过程，学习速度快于常人...",
    },
];

export default async function ArchivesPage() {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }

    // TODO: 从数据库获取用户的报告列表
    const reports = mockReports;

    return (
        <div className="h-full overflow-y-auto bg-background">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            天赋报告
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            查看和管理你的天赋进化历程
                        </p>
                    </div>
                    <Link href="/questionnaire">
                        <Button
                            size="lg"
                            className="gap-2 font-bold shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <Plus className="size-5" />
                            创建新报告
                        </Button>
                    </Link>
                </div>

                {/* Reports Grid */}
                {reports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
                            <Sparkles className="size-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">
                            还没有天赋报告
                        </h2>
                        <p className="text-muted-foreground text-center mb-6 max-w-md">
                            开始你的天赋探索之旅，通过问卷了解你的核心天赋和成长路径
                        </p>
                        <Link href="/questionnaire">
                            <Button size="lg" className="gap-2">
                                <Plus className="size-5" />
                                创建首份报告
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reports.map((report) => (
                            <Link
                                key={report.id}
                                href={`/reports/${report.id}`}
                                className="group"
                            >
                                <div className="border border-border rounded-2xl p-6 bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-200 hover:shadow-lg h-full flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="size-5 text-primary" />
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                                    天赋报告
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {report.title}
                                            </h3>
                                        </div>
                                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="size-5 text-primary" />
                                        </div>
                                    </div>

                                    {/* Stage Badge */}
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                            {report.stage}
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                        {report.summary}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="size-3.5" />
                                            <span>
                                                创建于{" "}
                                                {report.createdAt.toLocaleDateString("zh-CN", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                        {report.updatedAt > report.createdAt && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-primary">•</span>
                                                <span>
                                                    更新于{" "}
                                                    {report.updatedAt.toLocaleDateString("zh-CN", {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Help Text */}
                {reports.length > 0 && (
                    <div className="bg-muted/30 rounded-xl p-6 border border-border">
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="size-5 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground mb-1">
                                    持续探索你的天赋
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    随着时间推移，你的天赋会不断进化。定期创建新报告，追踪你的成长轨迹。
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
