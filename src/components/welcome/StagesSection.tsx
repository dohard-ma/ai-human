"use client";

import { Moon, Waves, Gem, Zap, Rocket } from "lucide-react";

const stages = [
  {
    icon: Moon,
    emoji: "🌙",
    title: "沉睡期",
    description: "隐约喜欢，但未被察觉",
    color: "from-slate-500 to-slate-600",
  },
  {
    icon: Waves,
    emoji: "🌊",
    title: "潜能期",
    description: "偶尔冒泡，能力不稳定",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Gem,
    emoji: "💎",
    title: "拥抱期",
    description: "自我接纳，刻意练习",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "优势期",
    description: "场景化应用，超越常人",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    title: "策略期",
    description: "天赋组合，自由调用，实现变现",
    color: "from-primary to-emerald-600",
  },
];

export function StagesSection() {
  return (
    <section id="stages" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
            天赋不是终点，是一条进化的路径
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            每个人的天赋都在不同阶段，了解你所处的位置，才能找到正确的成长方向
          </p>
        </div>

        {/* Stages Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stages.map((stage, index) => (
              <div key={stage.title} className="relative group">
                {/* Card */}
                <div className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all hover:shadow-lg text-center h-full flex flex-col">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 mb-4 mx-auto">
                    <stage.icon className="size-7 text-primary" />
                  </div>

                  {/* Stage Number */}
                  <div className="inline-flex items-center justify-center size-8 rounded-full bg-muted text-muted-foreground text-sm font-bold mb-3 mx-auto">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground text-pretty flex-1">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-primary/5 border border-primary/20 rounded-full">
            <Zap className="size-4 text-primary" />
            <span className="text-sm">
              AI 将精准判断你所处的阶段，并提供
              <span className="font-semibold text-primary">
                晋级下一阶段的行动清单
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
