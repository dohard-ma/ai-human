import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function IndexPage() {
  const session = await auth();
  console.log(`[IndexPage] Checking session:`, !!session);

  if (!session) {
    console.log(`[IndexPage] No session found, redirecting to /welcome`);
    redirect("/welcome");
  }

  // 登录后跳转到主聊天页面
  console.log(`[IndexPage] Session active! Redirecting to /chat`);
  redirect("/chat");
}
