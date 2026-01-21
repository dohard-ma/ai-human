"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "邮箱必填" };
  }

  try {
    await signIn("nodemailer", {
      email,
      redirect: false,
      callbackUrl: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "发送登录链接失败，请重试" };
    }
    // Auth.js 内部重定向会抛出错误，需要重新抛出
    throw error;
  }
}
