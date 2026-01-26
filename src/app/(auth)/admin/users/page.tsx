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
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-bold h-serif tracking-tight text-foreground">
            用户管理
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            全局管理平台用户权限与系统角色。
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索用户..."
              className="pl-9 pr-4 py-2 bg-muted border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-[200px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 size-4 opacity-40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </header>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                用户信息
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                角色
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                邀请人
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                注册时间
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-muted/10 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {user.email?.[0].toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {user.name || "未命名用户"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {user.roles.map((ur) => (
                      <span
                        key={ur.role.id}
                        className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold border border-primary/10"
                      >
                        {ur.role.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-muted-foreground">
                    {user.invitedBy?.email ? (
                      <span className="text-foreground/70">
                        {user.invitedBy.email}
                      </span>
                    ) : (
                      <span className="italic opacity-50">直接注册</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-[11px] tabular-nums text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
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
