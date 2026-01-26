import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Header } from "@/components/welcome/Header";
import { HeroSection } from "@/components/welcome/HeroSection";
import { PainPointsSection } from "@/components/welcome/PainPointsSection";
import { StagesSection } from "@/components/welcome/StagesSection";
import { FeaturesSection } from "@/components/welcome/FeaturesSection";
import { SampleReportSection } from "@/components/welcome/SampleReportSection";
import { TestimonialsSection } from "@/components/welcome/TestimonialsSection";
import { FooterCTA } from "@/components/welcome/FooterCTA";

export default async function WelcomePage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Pain Points Section */}
        <PainPointsSection />

        {/* Talent Stages Section */}
        <StagesSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Sample Report Section */}
        <SampleReportSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Footer CTA */}
        <FooterCTA />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 AI 天赋挖掘器. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              使用条款
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
