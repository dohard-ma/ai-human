"use client";

export function SampleReportSection() {
  return (
    <section id="sample-report" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 h-serif">
            你将获得这样的专属报告
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            包含核心天赋分析、优势定位、行动建议的完整个人成长指南
          </p>
        </div>

        {/* Report Preview Placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-[16/10] bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary/5 to-transparent">
              <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">个人天赋报告样本</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                完成对话后，您将获得一份包含 10,000+
                字的详细分析报告，涵盖您的核心天赋组合、比较优势、行动清单等内容
              </p>

              {/* Mock Report Elements */}
              <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-lg">
                <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">3</div>
                  <div className="text-xs text-muted-foreground">核心天赋</div>
                </div>
                <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">12</div>
                  <div className="text-xs text-muted-foreground">行动建议</div>
                </div>
                <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">5</div>
                  <div className="text-xs text-muted-foreground">职业方向</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 size-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 size-32 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
