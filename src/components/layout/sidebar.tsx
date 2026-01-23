"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  History,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
}

function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1",
        isActive
          ? "bg-zinc-800/50 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800/30",
      )}
    >
      <Icon
        className={cn(
          "size-5 transition-colors",
          isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300",
        )}
      />
      <span className="font-medium text-[15px]">{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute left-0 w-1 h-5 bg-blue-600 rounded-r-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}

interface SidebarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles: string[];
    canInvite: boolean;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const isAdmin = user.roles.includes("ADMIN");
  const isInviter = user.roles.includes("INVITER") || isAdmin;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-zinc-800/50 flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <svg
              viewBox="0 0 24 24"
              className="size-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-sm uppercase leading-none">
              Talent Inv.
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-80 mt-1">
              Process V2.5
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          <NavItem href="/chat" icon={MessageSquare} label="进行中会话" />
          <NavItem href="/history" icon={History} label="历史会话" />
          <NavItem href="/dashboard" icon={LayoutDashboard} label="变现看板" />
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/50 space-y-1">
          <p className="px-4 mb-2 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
            管理系统
          </p>
          {isInviter && (
            <NavItem href="/invitations" icon={UserPlus} label="我的邀请" />
          )}
          {isAdmin && (
            <NavItem href="/admin/users" icon={Users} label="用户管理" />
          )}
          <NavItem href="/settings" icon={Settings} label="系统设置" />
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 px-4 mb-4">
          <div className="size-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
            {user.email?.[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-zinc-200 truncate">
              {user.name || "User"}
            </p>
            <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="flex items-center gap-3 w-full px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/30 rounded-xl transition-all duration-200"
        >
          <LogOut className="size-5" />
          <span className="font-medium text-[15px]">退出登录</span>
        </button>
      </div>
    </aside>
  );
}
