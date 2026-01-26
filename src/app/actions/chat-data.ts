"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getConversationMessages(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.message.findMany({
    where: {
      conversationId,
      conversation: {
        userId: session.user.id,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getLastConversation() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await prisma.conversation.findFirst({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

/**
 * 获取用户的所有会话列表
 */
export async function getConversations(limit = 20) {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.conversation.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      updatedAt: true,
      messages: {
        take: 1,
        orderBy: { createdAt: "asc" },
        select: {
          content: true,
        },
      },
    },
  });
}

/**
 * 获取单个会话及其消息
 */
export async function getConversation(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: session.user.id,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

/**
 * 创建新会话
 */
export async function createConversation() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return await prisma.conversation.create({
    data: {
      userId: session.user.id,
      title: "新对话",
    },
  });
}

/**
 * 删除会话
 */
export async function deleteConversation(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // 先验证会话属于当前用户
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: session.user.id,
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // 删除会话（消息会通过 cascade 自动删除）
  await prisma.conversation.delete({
    where: { id: conversationId },
  });

  return { success: true };
}

/**
 * 重命名会话
 */
export async function renameConversation(
  conversationId: string,
  newTitle: string,
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // 先验证会话属于当前用户
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId: session.user.id,
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return await prisma.conversation.update({
    where: { id: conversationId },
    data: { title: newTitle.trim() || "新对话" },
  });
}
