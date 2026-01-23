"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import {
  generateVerificationCode,
  sendVerificationEmail,
  validateInviteCode,
} from "@/lib/auth-service";

/**
 * 第一步：验证邀请码并发送邮箱验证码
 */
export async function requestVerificationCode(
  email: string,
  mode: "login" | "register",
  inviteCode?: string,
) {
  if (!email) {
    return { error: "邮箱必填" };
  }

  try {
    // 1. 检查用户是否存在
    const user = await prisma.user.findUnique({ where: { email } });

    if (mode === "login") {
      if (!user) {
        return { error: "用户不存在，请先注册" };
      }
    } else if (mode === "register") {
      if (user) {
        return { error: "用户已存在，请直接登录" };
      }
      if (!inviteCode) {
        return { error: "注册需要提供邀请码" };
      }
      const { valid } = await validateInviteCode(inviteCode);
      if (!valid) {
        return { error: "邀请码无效或已过期" };
      }
    }

    // 2. 生成验证码
    const code = generateVerificationCode();

    // 3. 保存验证码到数据库
    await prisma.emailVerificationCode.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 分钟有效
      },
    });

    // 4. 发送邮件
    await sendVerificationEmail(email, code);

    return { success: true };
  } catch (error) {
    console.error("发送验证码失败:", error);
    return { error: "发送验证码失败，请重试" };
  }
}

/**
 * 第二步：凭验证码登录
 */
export async function loginWithCode(
  email: string,
  code: string,
  inviteCode?: string,
) {
  try {
    await signIn("credentials", {
      email,
      code,
      inviteCode,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "验证码错误或已过期" };
        default:
          return { error: "登录失败，请稍后重试" };
      }
    }
    // 处理特定的错误驱动（例如 authorize 抛出的 Error）
    if (error instanceof Error && error.message) {
      return { error: error.message };
    }
    throw error;
  }
}
