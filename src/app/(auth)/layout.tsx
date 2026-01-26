import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AuthLayoutClient } from "@/components/layout/auth-layout-client";
import { getConversations } from "@/app/actions/chat-data";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  // 获取用户的会话列表
  const conversations = await getConversations(20);

  return (
    <AuthLayoutClient user={session.user} conversations={conversations}>
      {children}
    </AuthLayoutClient>
  );
}
