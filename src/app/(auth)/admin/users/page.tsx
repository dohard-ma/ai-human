import { getAllUsers, getAvailableRoles } from "@/app/actions/user";
import { UserRoleButtons } from "@/components/admin/UserRoleButtons";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user?.roles.includes("ADMIN")) {
    redirect("/chat");
  }

  const users = await getAllUsers();
  const roles = await getAvailableRoles();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">用户管理</h1>
        <p className="text-zinc-500 text-sm mt-1">
          查看和管理系统中的所有用户及角色权限。
        </p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80">
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                用户信息
              </th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                角色
              </th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                邀请人
              </th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                注册时间
              </th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest text-right">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {users.map((user) => (
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
                      <div className="text-zinc-500 text-xs">{user.email}</div>
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
                <td className="px-6 py-4">
                  <div className="text-sm text-zinc-400">
                    {user.invitedBy?.email || (
                      <span className="text-zinc-600 italic">直接注册</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-zinc-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <UserRoleButtons
                    userId={user.id}
                    currentRoles={user.roles.map((r) => r.role.name)}
                    allRoles={roles}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
