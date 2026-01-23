import { Sidebar } from "@/components/layout/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-dvh bg-[#0a0a0a] text-zinc-100">
      {/* Sidebar */}
      <Sidebar user={session.user} />

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col relative">
        {/* Header (Optional, but included in reference) */}
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40">
          <div>
            <h2 className="text-zinc-100 font-semibold tracking-tight">
              沉浸式苏格拉底对话
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              STATE: ACTIVE INSIGHT RETRIEVAL
            </p>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <button className="p-2 hover:text-white transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="p-2 hover:text-white transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="size-5 fill-none stroke-current stroke-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
