"use client";

import { Battery, Zap, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: Battery,
    title: "努力但无效",
    description:
      "明明很努力，却总是赶不上别人？这可能不是你的错，只是你在用劣势死磕。",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "能量黑洞",
    description:
      "有些事做完感觉被掏空？那是你的'能量黑洞'，快来找到让你忘记时间的'心流时刻'。",
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: HelpCircle,
    title: "迷茫无措",
    description:
      "听到别人夸你有天赋却不自信？处于'天赋潜能'期的你，需要被确信和唤醒。",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
];

export function PainPointsSection() {
  return (
    <section
      id="pain-points"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
            你是否正处于这些状态？
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            这些困境不是你不够努力，而是还没找到属于你的天赋赛道
          </p>
        </div>

        {/* Pain Points Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl ${point.bgColor} mb-4`}
              >
                <point.icon className={`size-6 ${point.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-3">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
