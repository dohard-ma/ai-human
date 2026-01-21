import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Nodemailer from "next-auth/providers/nodemailer";
import { createTransport } from "nodemailer";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: "smtp.163.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "天赋挖掘 AI 助手 <yourname@163.com>",
      async sendVerificationRequest({ identifier: email, url, provider }) {
        const { host } = new URL(url);
        const transport = createTransport(provider.server);

        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `✨ 开启你的天赋探索：登录验证码`,
          text: `点击链接登录 ${host}\n${url}\n\n`,
          html: htmlTemplate({ url, host }),
        });
      },
    }),
  ],
});

function htmlTemplate({ url, host }: { url: string; host: string }) {
  const brandColor = "#4F46E5";
  return `
    <div style="background-color: #f9fafb; padding: 20px; font-family: 'PingFang SC', sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="background-color: ${brandColor}; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">天赋挖掘 AI 助手</h1>
        </div>
        <div style="padding: 40px; color: #374151; line-height: 1.6;">
          <p style="font-size: 18px; font-weight: 600;">你好！</p>
          <p>很高兴你能开启这段探索内在天赋的旅程。点击下方按钮，即可安全登录你的专属指挥中心：</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="background-color: ${brandColor}; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
              立即登录系统
            </a>
          </div>
          <div style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; margin: 20px 0;">
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 8px 0;">如果按钮无法点击，请复制以下链接到浏览器打开：</p>
            <p style="font-size: 12px; color: ${brandColor}; word-break: break-all; margin: 0;">${url}</p>
          </div>
          <p style="font-size: 12px; color: #9ca3af;">注意：此链接在 24 小时内有效。如果你没有尝试登录，请忽略此邮件。</p>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>© 2026 一人公司命令中心 | 让天赋可见，让行动有方</p>
        </div>
      </div>
    </div>
  `;
}
