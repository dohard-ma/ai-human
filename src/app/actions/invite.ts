"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { crypto } from "next/dist/compiled/@edge-runtime/primitives"; // Or just use a simple random string for now if next is weird
import { randomBytes } from "crypto";

const MAX_INVITE_CODES = 5;

/**
 * 获取当前用户的邀请码列表
 */
export async function getMyInviteCodes() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("未登录");

  return await prisma.inviteCode.findMany({
    where: { creatorId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * 创建新的邀请码
 */
export async function createInviteCode(channel: string, maxUses: number = 100) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("未登录");

  const isAdmin = session.user.roles.includes("ADMIN");
  const isInviter = session.user.roles.includes("INVITER");

  if (!isAdmin && !isInviter) {
    throw new Error("无权创建邀请码");
  }

  // 检查数量限制
  const count = await prisma.inviteCode.count({
    where: { creatorId: session.user.id },
  });

  if (count >= MAX_INVITE_CODES) {
    throw new Error(`每个用户最多创建 ${MAX_INVITE_CODES} 个邀请码`);
  }

  const code = randomBytes(4).toString("hex").toUpperCase();

  await prisma.inviteCode.create({
    data: {
      code,
      channel,
      maxUses,
      creatorId: session.user.id,
    },
  });

  revalidatePath("/invitations");
  return { success: true, code };
}

/**
 * 删除邀请码
 */
export async function deleteInviteCode(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("未登录");

  const inviteCode = await prisma.inviteCode.findUnique({
    where: { id },
  });

  if (!inviteCode || inviteCode.creatorId !== session.user.id) {
    throw new Error("无权操作");
  }

  await prisma.inviteCode.delete({
    where: { id },
  });

  revalidatePath("/invitations");
  return { success: true };
}
