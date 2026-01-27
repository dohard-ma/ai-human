import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { cookies } from "next/headers";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Talent Flow - 宁静成长",
  description: "发掘你的核心天赋，实现持续成长",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const themeInitScript = `
(() => {
  try {
    const theme = localStorage.getItem("talent_flow_theme") || "light";
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
  } catch {}
})();
`;

const langInitScript = `
(() => {
  try {
    const lang = localStorage.getItem("talent_flow_lang") || "zh";
    const root = document.documentElement;
    root.lang = lang === "zh" ? "zh-CN" : "en";
    root.dataset.lang = lang;
  } catch {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("talent_flow_lang")?.value;
  const htmlLang = langCookie === "en" ? "en" : "zh-CN";
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${notoSansSC.variable} ${notoSerifSC.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
