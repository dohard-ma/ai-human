"use client";

import { MessageSquare, FileText, TrendingUp, Check } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "交互式深度挖掘",
    description:
      "拒绝冷冰冰的选择题。AI 像一位懂你的老朋友，通过轻松的一问一答，从心流成就、他人反馈、自然擅长、持续投入四个维度深度探寻。",
    highlights: ["心流成就", "他人反馈", "自然擅长", "持续投入"],
  },
  {
    icon: FileText,
    title: `私人定制的"说明书"`,
    description: `生成包含核心天赋组合、比较优势定位、行动清单的万字私人报告。不仅告诉你"你是什么"，更告诉你"怎么用"。`,
    highlights: ["核心天赋组合", "比较优势定位", "行动清单"],
  },
  {
    icon: TrendingUp,
    title: "从挖掘到变现的闭环",
    description:
      "不仅是挖掘，更提供天赋变现闭环设计。帮助你找到领先别人 2-3 步的优势领域，设计属于你的超级个体之路。",
    highlights: ["变现路径", "优势领域", "超级个体"],
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
            为什么选择 AI 天赋挖掘器？
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            区别于传统死板的问卷，我们提供真正的深度陪伴式天赋发现之旅
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all hover:shadow-xl"
            >
              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="size-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {feature.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full"
                  >
                    <Check className="size-3" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
