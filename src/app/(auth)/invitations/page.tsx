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
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-2xl font-bold h-serif tracking-tight text-foreground">
          邀请管理
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          生成多渠道邀请码并追踪新用户注册进度。
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Invite Code Management */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">
            渠道管理
          </h3>
          <InviteCodeManager initialCodes={inviteCodes} />
        </div>

        {/* Right: Invited Users List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">
            受邀成员 (Invited Guests)
          </h3>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {invitedUsers.length === 0 ? (
              <div className="p-12 text-center">
                <div className="size-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-8 fill-none stroke-current stroke-2"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                  </svg>
                </div>
                <p className="text-foreground/80 font-medium">
                  暂无已邀请的用户
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  分享你的邀请码来发展你的团队。
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {invitedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-5 flex items-center justify-between group hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-accent flex items-center justify-center font-bold text-accent-foreground text-xs tabular-nums">
                        {user.email?.[0].toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {user.name || "未命名用户"}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-tight tabular-nums">
                            Joined{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                          <span className="text-muted-foreground/30 text-[10px]">
                            •
                          </span>
                          <div className="flex gap-1">
                            {user.roles.map((ur) => (
                              <span
                                key={ur.role.id}
                                className="text-[9px] font-bold text-primary/70 uppercase tracking-tighter"
                              >
                                {ur.role.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold border border-primary/10">
                        <span className="size-1.5 rounded-full bg-current"></span>{" "}
                        已激活
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
