"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  UserPlus,
  Plus,
  PanelLeft,
  Moon,
  Sun,
  User,
  ChevronUp,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteConversation,
  renameConversation,
} from "@/app/actions/chat-data";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

interface ConversationItem {
  id: string;
  title: string | null;
  updatedAt: Date;
  messages: { content: string }[];
}

function NavItem({ href, icon: Icon, label, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
        isActive
          ? "bg-black/5 dark:bg-white/5 text-foreground"
          : "text-foreground/70 dark:text-foreground/60 hover:bg-black/5 dark:hover:bg-white/5",
      )}
    >
      <Icon className="size-4 opacity-60" />
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-nav"
          className="absolute left-0 w-0.5 h-5 bg-primary rounded-r-full"
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
  conversations?: ConversationItem[];
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  user,
  conversations = [],
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.roles.includes("ADMIN");
  const isInviter = user.roles.includes("INVITER") || isAdmin;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // 编辑会话标题状态
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  // 初始化主题状态
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 编辑状态时自动聚焦输入框
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
      localStorage.setItem("talent_flow_theme", "light");
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
      localStorage.setItem("talent_flow_theme", "dark");
    }
    setIsDark(!isDark);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const handleNewChat = () => {
    router.push("/chat");
    handleNavClick();
  };

  // 获取会话显示标题
  const getConversationTitle = (conv: ConversationItem) => {
    if (conv.title) return conv.title;
    if (conv.messages.length > 0) {
      const firstMessage = conv.messages[0].content;
      return firstMessage.length > 30
        ? firstMessage.slice(0, 30) + "..."
        : firstMessage;
    }
    return "新对话";
  };

  // 处理删除会话
  const handleDelete = (convId: string) => {
    startTransition(async () => {
      try {
        await deleteConversation(convId);
        // 如果当前正在查看这个会话，跳转到 /chat
        if (pathname === `/chat/${convId}`) {
          router.push("/chat");
        }
        router.refresh();
      } catch (error) {
        console.error("删除会话失败:", error);
      }
    });
  };

  // 开始重命名
  const handleStartRename = (conv: ConversationItem) => {
    setEditingId(conv.id);
    setEditingTitle(getConversationTitle(conv));
  };

  // 提交重命名
  const handleRenameSubmit = (convId: string) => {
    if (!editingTitle.trim()) {
      setEditingId(null);
      return;
    }
    startTransition(async () => {
      try {
        await renameConversation(convId, editingTitle);
        router.refresh();
      } catch (error) {
        console.error("重命名会话失败:", error);
      } finally {
        setEditingId(null);
      }
    });
  };

  // 取消重命名
  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out md:relative",
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0 md:-ml-72",
        )}
      >
        {/* Header */}
        <div className="p-4 pb-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 select-none">
            <div className="size-6 rounded bg-emerald-900 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-emerald-950">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                <path d="M19 3v4" />
                <path d="M21 5h-4" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-emerald-900 dark:text-emerald-500">
              Talent Flow
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="收起侧边栏"
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground transition-colors"
          >
            <PanelLeft className="size-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4 pt-2 shrink-0">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-accent transition-all group active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Plus
                className="size-4.5 text-emerald-700 dark:text-emerald-400"
                strokeWidth={2.5}
              />
              <span className="text-sm font-semibold tracking-tight">
                开启新对话
              </span>
            </div>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
          <nav className="px-3 space-y-1">
            <NavItem
              href="/chat"
              icon={MessageSquare}
              label="当前对话"
              onClick={handleNavClick}
            />
            <NavItem
              href="/archives"
              icon={LayoutDashboard}
              label="天赋存档"
              onClick={handleNavClick}
            />
            <NavItem
              href="/tasks"
              icon={Settings}
              label="任务管理"
              onClick={handleNavClick}
            />
          </nav>

          <div className="h-px bg-border my-4 mx-6" />

          {/* Admin Section */}
          <nav className="px-3 space-y-1">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              管理中心
            </p>
            {isInviter && (
              <NavItem
                href="/invitations"
                icon={UserPlus}
                label="邀请管理"
                onClick={handleNavClick}
              />
            )}
            {isAdmin && (
              <NavItem
                href="/admin/users"
                icon={Users}
                label="用户管理"
                onClick={handleNavClick}
              />
            )}
            <NavItem
              href="/settings"
              icon={Settings}
              label="系统设置"
              onClick={handleNavClick}
            />
          </nav>

          <div className="h-px bg-border my-4 mx-6" />

          {/* Session History */}
          <div className="flex flex-col min-h-0 pb-4">
            <p className="px-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 shrink-0">
              会话记录
            </p>
            <div className="px-3 space-y-0.5">
              {conversations.length === 0 ? (
                <p className="px-3 py-2 text-xs text-muted-foreground/60 italic">
                  暂无会话记录
                </p>
              ) : (
                conversations.map((conv) => {
                  const isActive = pathname === `/chat/${conv.id}`;
                  const isEditing = editingId === conv.id;

                  return (
                    <div
                      key={conv.id}
                      className={cn(
                        "group relative flex items-center rounded-lg transition-all",
                        isActive
                          ? "bg-black/5 dark:bg-white/5"
                          : "hover:bg-black/5 dark:hover:bg-white/5",
                      )}
                    >
                      {isEditing ? (
                        // 编辑模式
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleRenameSubmit(conv.id);
                            } else if (e.key === "Escape") {
                              handleRenameCancel();
                            }
                          }}
                          onBlur={() => handleRenameSubmit(conv.id)}
                          disabled={isPending}
                          className="flex-1 px-3 py-2 text-xs bg-transparent border border-border rounded-lg outline-none focus:ring-1 focus:ring-primary"
                        />
                      ) : (
                        // 显示模式
                        <>
                          <Link
                            href={`/chat/${conv.id}`}
                            onClick={handleNavClick}
                            className={cn(
                              "flex-1 px-3 py-2 text-xs truncate",
                              isActive
                                ? "text-foreground"
                                : "text-foreground/60 hover:text-foreground/80",
                            )}
                          >
                            {getConversationTitle(conv)}
                          </Link>

                          {/* 三个点菜单按钮 */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={cn(
                                  "p-1.5 mr-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-opacity",
                                  isActive && "opacity-100",
                                )}
                                onClick={(e) => e.stopPropagation()}
                                aria-label="会话菜单"
                              >
                                <MoreHorizontal className="size-3.5 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem
                                onClick={() => handleStartRename(conv)}
                                className="gap-2 text-xs"
                              >
                                <Pencil className="size-3.5" />
                                重命名
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(conv.id)}
                                variant="destructive"
                                className="gap-2 text-xs"
                              >
                                <Trash2 className="size-3.5" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* User Footer - Fixed at bottom */}
        <div
          className="p-4 border-t border-border relative shrink-0"
          ref={menuRef}
        >
          {/* User Menu Dropdown */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border border-border rounded-xl shadow-xl py-1 z-60">
              <button className="w-full px-4 py-2.5 text-left text-xs hover:bg-accent transition-colors flex items-center gap-2">
                <User className="size-3.5 opacity-60" />
                个人资料
              </button>
              <button
                onClick={toggleDarkMode}
                className="w-full px-4 py-2.5 text-left text-xs hover:bg-accent transition-colors flex items-center gap-2"
              >
                {isDark ? (
                  <Sun className="size-3.5 opacity-60" />
                ) : (
                  <Moon className="size-3.5 opacity-60" />
                )}
                切换主题
              </button>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => signOut({ callbackUrl: "/welcome" })}
                className="w-full px-4 py-2.5 text-left text-xs text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
              >
                <LogOut className="size-3.5" />
                退出登录
              </button>
            </div>
          )}

          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl flex items-center gap-3 text-left transition-all"
          >
            <div className="size-8 rounded-full bg-emerald-800 dark:bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shrink-0 tabular-nums">
              {user.email?.[0].toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">
                {user.name || "User"}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                {isAdmin ? "Admin" : "Pro Member"}
              </p>
            </div>
            <ChevronUp
              className={cn(
                "size-3.5 text-muted-foreground transition-transform",
                userMenuOpen && "rotate-180",
              )}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
