import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
    Microscope,
    Zap,
    TrendingUp,
    Quote,
    Star,
    ShieldCheck,
    Users,
    Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "天赋报告 - AI 天赋挖掘器",
    description: "查看你的天赋进化报告",
};

// 示例数据 - 实际应该从数据库获取
const reportData = {
    meta: {
        title: "闫婷婷 - 天赋进化报告",
    },
    header: {
        profileLabel: "Talent Intelligence Profile",
        name: "闫婷婷",
        archetype: "洞察型 × 韧性型",
        currentStage: 1, // 0-based index, 1 = 潜能期
        stages: {
            list: [
                { label: "萌芽期" },
                { label: "潜能期" },
                { label: "拥抱期" },
                { label: "通透期" },
            ],
        },
    },
    hero: {
        image: {
            url: "https://static.laohuoji.link/f23867f2-195c-491d-ab5c-ff38d7e21d95.jpg",
            alt: "天赋进化总览图",
            fallbackUrl:
                "https://via.placeholder.com/800x450?text=Talent+Overview+Visualization",
        },
        reportId: "YAN-2026-CORE",
    },
    diagnosis: {
        title: "阶段诊断：为何是潜能期？",
        subtitle: "Stage Diagnosis Detail",
        basisTitle: "诊断依据",
        items: [
            {
                index: "01.",
                title: "他人已见，自己未信：",
                desc: "你的「人设」在朋友圈已是「想得明白」，说明天赋信号已外溢，只是你还没给它命名。",
            },
            {
                index: "02.",
                title: "未掌控的不稳定性：",
                desc: "对很多表现回答「不记得」，说明洞察力目前还是「本能直觉」，尚未内化为「可控技能」。",
            },
        ],
        nextStageAdvice: {
            title: "迈向下一阶段建议",
            lead: "收集证据：",
            desc: "你现在不需要去学任何新技能，而是要像侦探一样，收集自己「帮人看破本质」的真实证据。只有通过确凿的案例，才能把「无意识的本能」转化为「有意识的自信」。",
        },
    },
    talents: {
        title: "核心天赋识别",
        subtitle: "Core Identification",
        list: [
            {
                badge: "洞",
                title: "1. 主天赋：洞察型",
                score: {
                    label: "强度",
                    value: "7/10",
                },
                desc: "能看透事物本质，在别人困难时提供清晰视角。不是靠信息量取胜，而是靠「看问题的角度」。",
                quotes: [
                    "别人看不破的时候找我，可能我想得明白也看得明白吧。",
                    "人设是：想得明白、洞察力。",
                ],
                reason: {
                    title: "为什么是7分：",
                    desc: "别人已经认可，但你自己还没完全接受。当你开始有意识地使用这个天赋时，强度会迅速提升。",
                },
            },
            {
                badge: "韧",
                title: "2. 辅助天赋：韧性型（坚持/执行）",
                score: {
                    label: "强度",
                    value: "6/10",
                },
                desc: "认定的事就会一直做下去，说到做到，不轻易放弃。",
                quotes: [
                    "认定的事会一直做",
                    "说做什么就做什么",
                    "考驾照每一科都一把过—这需要持续的专注和执行力",
                ],
                reason: {
                    title: "为什么是6分：",
                    desc: "有明确信号，但目前更多体现在「完成任务」层面，还没有用在更大的目标上。",
                },
            },
            {
                badge: "学",
                title: "3. 潜在天赋（待验证）：学习型",
                score: {
                    label: "待验证",
                    value: "",
                },
                desc: "享受从未知到掌握的过程，学习速度快于常人。",
                quotes: [
                    "只要不是难的技术类，上手都比较快",
                    "最舍得花钱学英语",
                ],
                reason: {
                    title: "为什么是「待验证」：",
                    desc: "你说「努力也赶不上的领域是学习」，这和上面的线索有矛盾。我的判断是——你不擅长的可能是「应试型学习」，而不是「真正的学习」。建议在感兴趣的领域验证一下。",
                },
                advice: {
                    title: "验证建议：",
                    desc: "挑一个你真正好奇的领域（比如玄学、心理学、某个你感兴趣的技能），看看自己的学习速度和投入状态。",
                },
            },
        ],
    },
    synergy: {
        title: "天赋组合分析",
        subtitle: "Synergy Analysis",
        trait: {
            title: "组合特质 / Synergy",
            highlight: "「幕后军师」与「苦行僧」",
            desc: "大多数人要么想得好但做不到，要么做得苦 but 想不通。你兼具了「想得透」和「做到底」的特质。",
        },
        roles: [
            {
                type: "核心逻辑",
                title: "独立判断 + 独立执行",
                desc: "适合：独立研究者、深度分析师、内容创作者。",
            },
            {
                type: "环境偏好",
                title: "幕后策略 > 台前社交",
                desc: "适合：策略顾问、幕僚型角色、技能型专家。",
            },
        ],
        reason:
            "你的天赋需要「先想清楚再行动」，你更适合在安静的环境中持续深耕，而不是在频繁的社交中消耗能量。",
        recommended: {
            title: "推荐角色",
            desc: "独立研究者、深度内容创作者、策略顾问。",
        },
        blindSpots: {
            title: "潜在盲点",
            items: [
                "社交黑洞：跟陌生人打交道会迅速耗干你的洞察力，警惕「表演热情」。",
                "自我透明：容易低估自己想明白的能力，觉得「这不算什么」。",
            ],
        },
    },
    competitive: {
        title: "比较优势定位",
        subtitle: "Competitive Edge",
        table: [
            {
                ability: "想得明白",
                type: "天赋",
                basis: "别人主动找你，且你觉得自然",
                isCore: true,
            },
            {
                ability: "说到做到",
                type: "天赋",
                basis: "这是你的人设，不仅是偶尔的行为",
                isCore: false,
            },
            {
                ability: "非技术学习",
                type: "优势",
                basis: "你愿意投入金钱和时间，且上手快",
                isCore: false,
            },
            {
                ability: "销售表演",
                type: "避坑",
                basis: "明确的能量黑洞，需避开",
                isCore: false,
                isWarning: true,
            },
        ],
        highlight: {
            label: "Who I Am Better Than",
            text: "你不需要成为最老练的专家，你只需成为那个",
            emphasis: "「比对方想得更清楚、更透彻的人」",
        },
    },
    scenario: {
        title: "场景适配矩阵",
        subtitle: "Scenario Matrix",
        items: [
            {
                id: "A",
                title: "独立分析 / 策略研究",
                stars: 5,
                badge: "立即启动",
                level: "high",
            },
            {
                id: "B",
                title: "深度阅读 / 记录思考",
                stars: 5,
                badge: "继续保持",
                level: "medium",
            },
            {
                id: "D",
                title: "广泛社交 / 销售表演",
                stars: 1,
                badge: "不推荐",
                level: "low",
            },
        ],
        details: [
            {
                title: "场景 1：写作与记录思考",
                desc: "文字是你最舒服的表达方式，且能固化你的洞察。从「帮自己想清楚」开始写笔记。比如：「今天我观察到了什么人性规律？」如果不记录，你的洞察天赋就会像水一样流走。",
            },
            {
                title: "场景 2：朋友圈里的「解惑者」",
                desc: "既然别人已经因为「看不破」找你了，这就是你天赋的自然出口。当朋友来找你聊的时候，有意识地复盘：我是怎么帮她把乱麻理顺的？ 这种经验积累多了，未来就是咨询师的雏形。",
            },
        ],
    },
    action: {
        title: "进化路径与行动",
        subtitle: "Action Roadmap",
        weekly: {
            title: "本周行动 (7 Days Plan)",
            items: [
                {
                    index: "1",
                    title: "案例收集：",
                    desc: "写下3个「我帮别人想清楚」的过往案例。",
                },
                {
                    index: "2",
                    title: "外部反馈：",
                    desc: "问一个朋友：「你觉得我哪方面看得明白？」",
                },
            ],
        },
        roadmap: {
            title: "90天计划 (90 Days Roadmap)",
            items: [
                {
                    title: "M1: 证据确认",
                    desc: "建立「洞察力」心理认同。",
                    isActive: true,
                },
                {
                    title: "M2: 刻意输出",
                    desc: "通过文字固化洞察，展示你的观点。",
                    isActive: false,
                },
                {
                    title: "M3: 影响力闭环",
                    desc: "帮3-5个朋友解决困惑，验证分析能力。",
                    isActive: false,
                },
            ],
        },
    },
    growth: {
        title: "成长建议",
        subtitle: "Growth Suggestions",
        items: [
            {
                title: "警惕「这不算什么」综合征",
                desc: "你觉得想得明白是正常的事，但请相信，这对大多数人来说是非常难的。不要低估你的核心竞争力。",
                icon: "shield",
            },
            {
                title: "远离「表演热情」的场合",
                desc: "需要大量社交、逼你表演热情的环境会迅速耗干你的电量。在孤独中思考，在静默中爆发。",
                icon: "users",
                isWarning: true,
            },
        ],
        quote: {
            lines: [
                "你不需要表演热情，",
                "你只需在别人迷茫时，",
                "说出你看到的真相。",
            ],
            signature: "閆婷婷 · 幕后军师",
        },
    },
    footer: {
        text: "Talent Intelligence Report © 2026",
    },
    cta: {
        text: "保存并分享我的天赋卡片",
    },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ReportDetailPage({ params }: PageProps) {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }

    const { id } = await params;
    // TODO: 根据 id 从数据库获取报告数据
    console.log("Report ID:", id);

    const data = reportData;

    return (
        <div className="h-full overflow-y-auto bg-slate-50 text-slate-900">
            <div className="max-w-2xl mx-auto px-6 py-12 pb-32 space-y-10">
                {/* 1. 用户信息和天赋标签 */}
                <section className="text-center pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-4 border border-emerald-100">
                        {data.header.profileLabel}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 mb-3">
                        {data.header.name}
                    </h1>
                    <p className="text-primary text-sm sm:text-base font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-8 underline decoration-2 underline-offset-8 decoration-emerald-100">
                        {data.header.archetype}
                    </p>

                    {/* 阶段进度条 */}
                    <div className="max-w-xs mx-auto mb-10">
                        <div className="flex items-center mb-3">
                            {data.header.stages.list.map((stage, idx) => (
                                <div key={idx} className="flex items-center flex-1">
                                    <div
                                        className={`${idx === 0
                                            ? "size-2.5"
                                            : idx === data.header.currentStage
                                                ? "size-3.5"
                                                : "size-2.5"
                                            } rounded-full ${idx <= data.header.currentStage
                                                ? "bg-primary"
                                                : "bg-slate-200"
                                            } ${idx === data.header.currentStage
                                                ? "ring-4 ring-emerald-100 shadow-[0_0_12px_rgba(6,95,70,0.3)]"
                                                : idx < data.header.currentStage
                                                    ? "shadow-[0_0_8px_rgba(6,95,70,0.5)]"
                                                    : ""
                                            }`}
                                    />
                                    {idx < data.header.stages.list.length - 1 && (
                                        <div
                                            className={`h-[2px] flex-1 ${idx < data.header.currentStage
                                                ? "bg-primary"
                                                : "bg-slate-200"
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-tighter px-1">
                            {data.header.stages.list.map((stage, idx) => (
                                <span
                                    key={idx}
                                    className={
                                        idx === data.header.currentStage
                                            ? "text-primary"
                                            : "text-slate-400"
                                    }
                                >
                                    {stage.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Nano Banana 总览主图 */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white relative group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-full aspect-video">
                        <Image
                            src={data.hero.image.url}
                            alt={data.hero.image.alt}
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                    </div>
                    <div className="absolute bottom-4 right-6 text-white/70 text-[10px] font-mono tracking-tighter">
                        ID: {data.hero.reportId}
                    </div>
                </div>

                {/* 3. 阶段诊断详情 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                            {data.diagnosis.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400 italic">
                            {data.diagnosis.subtitle}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {/* 诊断依据 */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <h4 className="text-xs sm:text-sm font-black text-slate-800 mb-3 flex items-center gap-2 tracking-tight">
                                <Microscope className="size-3.5 text-emerald-600" />
                                {data.diagnosis.basisTitle}
                            </h4>
                            <ul className="text-xs sm:text-sm text-slate-500 space-y-4 leading-relaxed font-light">
                                {data.diagnosis.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-pretty">
                                        <span className="text-primary font-black shrink-0">
                                            {item.index}
                                        </span>
                                        <span>
                                            <strong className="text-slate-800">{item.title}</strong>
                                            {item.desc}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 迈向下一阶段建议 */}
                        <div className="p-6 rounded-2xl bg-primary text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-xs sm:text-sm font-black mb-3 flex items-center gap-2 tracking-tight text-emerald-300">
                                    <Zap className="size-3.5 fill-emerald-300" />
                                    {data.diagnosis.nextStageAdvice.title}
                                </h4>
                                <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-light text-pretty">
                                    <strong className="text-white font-bold">
                                        {data.diagnosis.nextStageAdvice.lead}
                                    </strong>
                                    {data.diagnosis.nextStageAdvice.desc}
                                </p>
                            </div>
                            <TrendingUp className="absolute -right-4 -bottom-4 size-24 text-white/5 -rotate-12" />
                        </div>
                    </div>
                </section>

                {/* 4. 核心天赋识别 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                            {data.talents.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400">
                            {data.talents.subtitle}
                        </p>
                    </div>
                    <div className="space-y-6">
                        {data.talents.list.map((talent, idx) => (
                            <div key={idx} className="flex gap-4 sm:gap-6 relative">
                                <div className="flex flex-col items-center">
                                    <div className="size-10 rounded-full bg-primary text-white flex shrink-0 items-center justify-center font-bold text-sm shadow-lg z-10">
                                        {talent.badge}
                                    </div>
                                    {idx < data.talents.list.length - 1 && (
                                        <div className="w-px h-full bg-slate-100 absolute top-10" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 flex-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                            {talent.title}
                                        </h3>
                                        <span className="text-[11px] sm:text-xs font-mono font-bold text-primary bg-emerald-50 px-2 py-1 rounded tabular-nums tracking-tighter border border-emerald-100 w-fit">
                                            {talent.score.label}{" "}
                                            {talent.score.value && talent.score.value}
                                        </span>
                                    </div>
                                    <div className="text-sm sm:text-base text-slate-600 leading-relaxed font-light text-pretty space-y-2">
                                        <p>{talent.desc}</p>
                                        <div className="space-y-2 mt-1">
                                            {talent.quotes.map((quote, qIdx) => (
                                                <div
                                                    key={qIdx}
                                                    className="flex gap-2 text-[11px] sm:text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100/50"
                                                >
                                                    <Quote className="size-3 shrink-0 opacity-20" />
                                                    <p className="text-pretty">&ldquo;{quote}&rdquo;</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p>
                                            <strong className="text-slate-800">
                                                {talent.reason.title}
                                            </strong>
                                            {talent.reason.desc}
                                        </p>
                                        {talent.advice && (
                                            <p>
                                                <strong className="text-slate-800">
                                                    {talent.advice.title}
                                                </strong>
                                                {talent.advice.desc}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. 天赋组合分析 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black tracking-tighter text-balance text-slate-900">
                            {data.synergy.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400">
                            {data.synergy.subtitle}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                                {data.synergy.trait.title}
                            </p>
                            <p className="text-lg font-bold text-primary leading-tight text-pretty tracking-tight">
                                你是{" "}
                                <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
                                    {data.synergy.trait.highlight}
                                </span>{" "}
                                的结合体。
                            </p>
                            <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed text-pretty font-light">
                                {data.synergy.trait.desc}
                            </p>
                        </div>

                        {/* 推荐角色及本质原因 */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                                推荐角色定位
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.synergy.roles.map((role, idx) => (
                                    <div
                                        key={idx}
                                        className="p-5 rounded-2xl bg-emerald-50/30 border border-emerald-100"
                                    >
                                        <p className="text-[10px] font-bold text-primary mb-2 tracking-widest uppercase">
                                            {role.type}
                                        </p>
                                        <p className="text-sm font-black text-slate-800 mb-2">
                                            {role.title}
                                        </p>
                                        <p className="text-[11px] text-slate-500 leading-relaxed">
                                            {role.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 py-3 bg-slate-900 text-white rounded-xl text-[10px] leading-relaxed">
                                <span className="text-yellow-400 font-bold mr-1">💡 为什么？</span>
                                {data.synergy.reason}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex gap-4 items-start p-2">
                                <div className="size-8 rounded-lg bg-primary text-white flex shrink-0 items-center justify-center font-bold text-xs shadow-sm">
                                    职
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight text-slate-900">
                                        {data.synergy.recommended.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed text-pretty font-light">
                                        {data.synergy.recommended.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-2">
                                <div className="size-8 rounded-lg bg-red-100 text-red-600 flex shrink-0 items-center justify-center font-bold text-xs shadow-sm">
                                    盲
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-red-600 tracking-tight">
                                        {data.synergy.blindSpots.title}
                                    </h4>
                                    {data.synergy.blindSpots.items.map((item, idx) => (
                                        <p
                                            key={idx}
                                            className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed text-pretty font-light"
                                        >
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. 比较优势定位 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-black tracking-tighter text-slate-900">
                            {data.competitive.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400">
                            {data.competitive.subtitle}
                        </p>
                    </div>

                    <div className="overflow-hidden border border-slate-100 rounded-2xl mb-8">
                        <div className="grid grid-cols-3 bg-slate-50 p-3 sm:p-4 text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                            <div>能力维度</div>
                            <div>类型</div>
                            <div>判断依据</div>
                        </div>
                        <div className="divide-y divide-slate-50 text-[11px] sm:text-xs">
                            {data.competitive.table.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-3 p-3 sm:p-4 items-center">
                                    <div
                                        className={`font-bold ${row.isCore
                                            ? "text-primary"
                                            : row.isWarning
                                                ? "text-red-400"
                                                : "text-slate-700"
                                            }`}
                                    >
                                        {row.ability}
                                    </div>
                                    <div className="text-slate-400">{row.type}</div>
                                    <div className="text-slate-500 italic font-light">
                                        {row.basis}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-emerald-50 text-center">
                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em] mb-3">
                            {data.competitive.highlight.label}
                        </p>
                        <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                            {data.competitive.highlight.text} <br />
                            <span className="text-lg font-black text-primary">
                                {data.competitive.highlight.emphasis}
                            </span>
                            。
                        </p>
                    </div>
                </section>

                {/* 7. 场景适配矩阵 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black tracking-tighter text-balance text-slate-900">
                            {data.scenario.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400">
                            {data.scenario.subtitle}
                        </p>
                    </div>
                    <div className="space-y-4">
                        {data.scenario.items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl transition-all shadow-sm gap-3 ${item.level === "high"
                                    ? "border-2 border-primary bg-emerald-50/20"
                                    : item.level === "medium"
                                        ? "border border-slate-100 bg-white"
                                        : "border border-slate-100 opacity-40 grayscale"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`size-10 rounded-xl flex items-center justify-center font-black ${item.level === "high"
                                            ? "bg-primary text-white"
                                            : item.level === "medium"
                                                ? "bg-slate-200 text-slate-600"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        {item.id}
                                    </div>
                                    <div
                                        className={`text-sm sm:text-base font-black tracking-tight ${item.level === "high"
                                            ? "text-primary"
                                            : item.level === "medium"
                                                ? "text-slate-700"
                                                : "text-slate-400"
                                            }`}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: item.stars }).map((_, starIdx) => (
                                            <Star
                                                key={starIdx}
                                                className={`size-3 ${item.level === "high"
                                                    ? "fill-emerald-600 text-emerald-600"
                                                    : item.level === "medium"
                                                        ? "fill-slate-400 text-slate-400"
                                                        : "fill-slate-300 text-slate-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span
                                        className={`text-[9px] px-2 py-1 rounded-sm font-black uppercase tracking-tighter ${item.level === "high"
                                            ? "bg-emerald-600 text-white"
                                            : item.level === "medium"
                                                ? "bg-slate-400 text-white"
                                                : "bg-slate-300 text-white"
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className="mt-10 space-y-6">
                            {data.scenario.details.map((detail, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50"
                                >
                                    <h3 className="font-black text-sm sm:text-base mb-3 flex items-center gap-2 text-slate-800 tracking-tight">
                                        <span className="size-2 rounded-full bg-primary" />
                                        {detail.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light text-pretty">
                                        {detail.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 8. 进化路径与行动 */}
                <section className="bg-primary rounded-[2.5rem] p-6 sm:p-8 md:p-10 text-white shadow-2xl shadow-emerald-900/40 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="relative z-10">
                        <div className="mb-10">
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-1">
                                {data.action.title}
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-300">
                                {data.action.subtitle}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6 border-b border-white/10 pb-2">
                                {data.action.weekly.title}
                            </h4>
                            <div className="space-y-6">
                                {data.action.weekly.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="size-6 rounded bg-white text-primary flex shrink-0 items-center justify-center text-[10px] font-black">
                                            {item.index}
                                        </div>
                                        <p className="text-xs sm:text-sm text-emerald-50/80 font-light leading-relaxed">
                                            <strong className="text-white">{item.title}</strong>{" "}
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6 border-b border-white/10 pb-2">
                                {data.action.roadmap.title}
                            </h4>
                            <div className="space-y-8 relative">
                                <div className="absolute left-3 top-2 bottom-2 w-px bg-white/20" />
                                {data.action.roadmap.items.map((item, idx) => (
                                    <div key={idx} className="relative pl-10">
                                        <div
                                            className={`absolute left-3 top-1 size-2 rounded-full -translate-x-1/2 ${item.isActive
                                                ? "bg-emerald-400 ring-4 ring-emerald-400/20"
                                                : "bg-white/30"
                                                }`}
                                        />
                                        <h5
                                            className={`text-[10px] font-black mb-1 ${item.isActive ? "text-emerald-200" : "text-white"
                                                }`}
                                        >
                                            {item.title}
                                        </h5>
                                        <p className="text-[11px] sm:text-xs text-white/60 font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Zap className="absolute -right-8 -top-8 size-48 text-white/5 rotate-12" />
                </section>

                {/* 9. 成长建议 */}
                <section className="border rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-sm bg-white border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black tracking-tighter text-balance text-slate-900">
                            {data.growth.title}
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 font-bold text-slate-400">
                            {data.growth.subtitle}
                        </p>
                    </div>

                    <div className="space-y-4 text-pretty mb-12">
                        {data.growth.items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-2xl border flex gap-4 bg-white transition-colors shadow-sm ${item.isWarning
                                    ? "border-slate-100 hover:border-red-100"
                                    : "border-slate-100 hover:border-emerald-200"
                                    }`}
                            >
                                {item.icon === "shield" ? (
                                    <ShieldCheck className="size-5 text-primary shrink-0" />
                                ) : (
                                    <Users className="size-5 text-red-500 shrink-0" />
                                )}
                                <div>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight">
                                        {item.title}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed text-pretty font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 金句样式 */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 bg-emerald-50/50 rounded-[3rem] -rotate-1 scale-105" />
                        <div className="relative z-10 p-6 sm:p-8 md:p-14 bg-white rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-900/5 text-center overflow-hidden">
                            <Quote className="absolute -top-4 -left-4 size-32 text-emerald-600/5 rotate-12" />
                            <Quote className="absolute -bottom-4 -right-4 size-32 text-emerald-600/5 -rotate-12" />

                            <blockquote className="text-xl sm:text-2xl md:text-3xl font-black text-primary leading-tight italic text-balance mb-6 sm:mb-8 relative">
                                {data.growth.quote.lines.map((line, idx) => (
                                    <span key={idx}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </blockquote>

                            <div className="flex flex-col items-center">
                                <div className="h-[2px] w-8 bg-primary mb-4 opacity-20" />
                                <p className="text-[11px] sm:text-xs text-slate-400 font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                                    {data.growth.quote.signature}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center pt-8 pb-4">
                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.4em] font-bold">
                        {data.footer.text}
                    </p>
                </footer>
            </div>

            {/* 底部悬浮按钮 - sticky 定位相对于滚动容器 */}
            <div className="sticky bottom-0 left-0 right-0 p-4 sm:p-6 bg-linear-to-t from-slate-50 via-slate-50/95 to-transparent backdrop-blur-sm">
                <div className="max-w-2xl mx-auto">
                    <Button
                        size="lg"
                        className="w-full py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs sm:text-sm shadow-2xl shadow-emerald-900/40 tracking-[0.18em] sm:tracking-[0.2em] uppercase flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                        <Share2 className="size-4" />
                        {data.cta.text}
                    </Button>
                </div>
            </div>
        </div>
    );
}
