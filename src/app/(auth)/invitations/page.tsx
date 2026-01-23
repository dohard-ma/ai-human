import { getInvitedUsers } from "@/app/actions/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getMyInviteCodes } from "@/app/actions/invite";
import { InviteCodeManager } from "@/components/inviter/InviteCodeManager";

export default async function InvitationsPage() {
  const session = await auth();
  const isAdmin = session?.user?.roles.includes("ADMIN");
  const isInviter = session?.user?.roles.includes("INVITER");

  if (!isAdmin && !isInviter) {
    redirect("/chat");
  }

  const [invitedUsers, inviteCodes] = await Promise.all([
    getInvitedUsers(),
    getMyInviteCodes(),
  ]);

  return (
    <div className="p-8">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-zinc-100">邀请管理</h1>
        <p className="text-zinc-500 text-sm mt-1 mb-10">
          生成多渠道邀请码并追踪新用户注册进度。
        </p>

        <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">
          邀请码管理 (最多5个)
        </h2>
        <InviteCodeManager initialCodes={inviteCodes} />
      </div>

      <div className="mb-8">
        <h2 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-4">
          已邀请的用户
        </h2>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        {invitedUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="size-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                className="size-8 text-zinc-600 fill-none stroke-current stroke-2"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="16" y1="11" x2="22" y2="11" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium">暂无已邀请的用户</p>
            <p className="text-zinc-600 text-sm mt-1">
              分享你的邀请码来发展你的团队。
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800/80">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  用户信息
                </th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  角色
                </th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">
                  注册时间
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/30">
              {invitedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors">
                        {user.email?.[0].toUpperCase() || "?"}
                      </div>
                      <div>
                        <div className="text-zinc-100 font-medium">
                          {user.name || "未命名用户"}
                        </div>
                        <div className="text-zinc-500 text-xs">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((ur) => (
                        <span
                          key={ur.role.id}
                          className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider"
                        >
                          {ur.role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
