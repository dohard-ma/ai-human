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
