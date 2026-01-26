"use client";

import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "关于天赋模型", href: "#stages" },
  { label: "产品特色", href: "#features" },
  { label: "成功案例", href: "#testimonials" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-2 group">
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">天赋挖掘器</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">登录</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-in">立即体验</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            mobileMenuOpen ? "max-h-80 pb-4" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 px-4 border-t border-border mt-2">
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href="/sign-in">登录</Link>
              </Button>
              <Button size="sm" asChild className="w-full">
                <Link href="/sign-in">立即体验</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
