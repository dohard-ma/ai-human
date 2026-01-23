"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * 获取所有用户列表 (仅限 ADMIN)
 */
export async function getAllUsers() {
  const session = await auth();
  if (!session?.user?.roles.includes("ADMIN")) {
    throw new Error("无权访问：仅限管理员");
  }

  const users = await prisma.user.findMany({
    include: {
      roles: {
        include: { role: true },
      },
      invitedBy: true,
      usedInviteCode: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return users;
}

/**
 * 更新用户角色 (仅限 ADMIN)
 */
export async function updateUserRole(userId: string, roleNames: string[]) {
  const session = await auth();
  if (!session?.user?.roles.includes("ADMIN")) {
    throw new Error("无权访问：仅限管理员");
  }

  // 获取对应的角色 ID
  const roles = await prisma.role.findMany({
    where: { name: { in: roleNames } },
  });

  // 删除旧角色并添加新角色
  await prisma.userRole.deleteMany({
    where: { userId },
  });

  await prisma.userRole.createMany({
    data: roles.map((role) => ({
      userId,
      roleId: role.id,
    })),
  });

  revalidatePath("/admin/users");
  return { success: true };
}

/**
 * 获取被邀请的用户列表 (仅限 INVITER 或以上)
 */
export async function getInvitedUsers() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("未登录");
  }

  const users = await prisma.user.findMany({
    where: {
      invitedById: session.user.id,
    },
    include: {
      roles: {
        include: { role: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return users;
}

/**
 * 获取所有可用角色
 */
export async function getAvailableRoles() {
  return await prisma.role.findMany();
}
