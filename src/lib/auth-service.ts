import { prisma } from "@/lib/prisma";
import { createTransport } from "nodemailer";

/**
 * 生成 4 位数字验证码
 */
export function generateVerificationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * 发送验证码邮件
 */
export async function sendVerificationEmail(email: string, code: string) {
  const transport = createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const brandColor = "#4F46E5";

  await transport.sendMail({
    to: email,
    from: process.env.EMAIL_FROM || "天赋挖掘 AI 助手 <yourname@163.com>",
    subject: `【验证码】${code} - 安全登录验证`,
    html: `
      <div style="background-color: #f9fafb; padding: 20px; font-family: 'PingFang SC', sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background-color: ${brandColor}; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">天赋挖掘 AI 助手</h1>
          </div>
          <div style="padding: 40px; color: #374151; line-height: 1.6;">
            <p style="font-size: 18px; font-weight: 600;">你好！</p>
            <p>你正在尝试登录系统，请在登录页面输入以下验证码：</p>
            <div style="text-align: center; margin: 40px 0;">
              <span style="font-size: 48px; font-weight: 800; letter-spacing: 10px; color: ${brandColor}; border: 2px dashed #e5e7eb; padding: 10px 30px; border-radius: 8px; background-color: #f3f4f6;">
                ${code}
              </span>
            </div>
            <p style="font-size: 14px; color: #6b7280; text-align: center;">验证码有效期为 10 分钟。如果不是本人操作，请忽略此邮件。</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
            <p>© 2026 一人公司命令中心 | 让天赋可见，让行动有方</p>
          </div>
        </div>
      </div>
    `,
  });
}

/**
 * 校验验证码
 */
export async function verifyCode(
  email: string,
  code: string,
): Promise<boolean> {
  const record = await prisma.emailVerificationCode.findFirst({
    where: {
      email,
      code,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return false;

  // 使用后删除
  await prisma.emailVerificationCode.delete({
    where: { id: record.id },
  });

  return true;
}

/**
 * 校验邀请码
 */
export async function validateInviteCode(
  code: string,
): Promise<{ valid: boolean; creatorId?: string; inviteId?: string }> {
  const invite = await prisma.inviteCode.findUnique({
    where: { code },
  });

  if (!invite) return { valid: false };

  // 检查有效期
  if (invite.expiresAt && invite.expiresAt < new Date()) {
    return { valid: false };
  }

  // 检查使用次数
  if (invite.usedCount >= invite.maxUses) {
    return { valid: false };
  }

  return { valid: true, creatorId: invite.creatorId, inviteId: invite.id };
}

/**
 * 记录邀请关系并增加使用次数
 */
export async function markInviteCodeAsUsed(code: string) {
  await prisma.inviteCode.update({
    where: { code },
    data: {
      usedCount: { increment: 1 },
    },
  });
}
