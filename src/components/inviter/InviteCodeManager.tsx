"use client";

import { useState } from "react";
import { createInviteCode, deleteInviteCode } from "@/app/actions/invite";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Copy, Check, Info } from "lucide-react";

interface InviteCode {
  id: string;
  code: string;
  channel: string | null;
  usedCount: number;
  maxUses: number;
}

export function InviteCodeManager({
  initialCodes,
}: {
  initialCodes: InviteCode[];
}) {
  const [codes, setCodes] = useState(initialCodes);
  const [channel, setChannel] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!channel.trim()) return;
    setIsCreating(true);
    try {
      const res = await createInviteCode(channel);
      if (res.success) {
        setChannel("");
        // 我们假设页面会 revalidate，或者手动刷新
        window.location.reload();
      }
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除此邀请码吗？")) return;
    try {
      await deleteInviteCode(id);
      setCodes(codes.filter((c) => c.id !== id));
    } catch (e: any) {
      alert(e.message);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Create Section */}
      {codes.length < 5 && (
        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Plus className="size-4 text-blue-500" />
            生成新邀请码
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="输入分发渠道（如：朋友圈、知乎...）"
              className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={handleCreate}
              disabled={isCreating || !channel.trim()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
            >
              {isCreating ? "生成中..." : "生成邀请码"}
            </button>
          </div>
          <p className="text-[10px] text-zinc-500 mt-3 flex items-center gap-1">
            <Info className="size-3" />
            每个用户最多可创建 5 个活跃邀请码。每个邀请码默认可使用 100 次。
          </p>
        </div>
      )}

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {codes.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
                  渠道
                </div>
                <div className="text-zinc-100 font-medium">
                  {item.channel || "默认渠道"}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-3 flex items-center justify-between mb-4">
              <code className="text-blue-400 font-mono font-bold tracking-wider">
                {item.code}
              </code>
              <button
                onClick={() => copyToClipboard(item.code)}
                className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors"
                title="复制邀请码"
              >
                {copiedCode === item.code ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-[10px] text-zinc-500 font-mono">
                使用进度:{" "}
                <span className="text-zinc-300">{item.usedCount}</span> /{" "}
                {item.maxUses}
              </div>
              <div className="h-1 flex-1 mx-4 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: `${Math.min(100, (item.usedCount / item.maxUses) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        {codes.length === 0 && !isCreating && (
          <div className="col-span-full border-2 border-dashed border-zinc-800/50 rounded-2xl p-8 text-center">
            <p className="text-zinc-600 text-sm">尚未创建任何邀请码</p>
          </div>
        )}
      </div>
    </div>
  );
}
