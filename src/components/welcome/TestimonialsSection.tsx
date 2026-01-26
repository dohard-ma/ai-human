"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "小雅",
    role: "产品经理",
    avatar: "雅",
    talentType: "洞察型 × 韧性型",
    content:
      "以前觉得自己想太多，现在发现'看得明白'是我的核心天赋。AI 帮我把这种能力转化为了分析师的职业路径，现在每天的工作都让我充满能量。",
  },
  {
    name: "晶晶",
    role: "花艺师",
    avatar: "晶",
    talentType: "创造型 × 审美型",
    content:
      "在这个系统里确认了我的'反向天赋'是不擅长沟通，于是我调整了商业模式，只接'痛快'的客户，反而收入更高了。",
  },
  {
    name: "阿明",
    role: "自由职业者",
    avatar: "明",
    talentType: "影响型 × 连接型",
    content:
      "一直以为自己什么都会一点，但都不精。通过天赋挖掘发现我的核心优势是'整合资源'，现在做咨询顾问，用对了天赋真的轻松很多。",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
            他们在这里找到了自己的"天赋密码"
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            真实用户的蜕变故事，每一个都可能是未来的你
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all hover:shadow-lg flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="size-8 text-primary/20 mb-4" />

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 text-pretty">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/* Avatar */}
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {testimonial.avatar}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>

                {/* Talent Type Badge */}
                <div className="px-2.5 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full">
                  {testimonial.talentType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
