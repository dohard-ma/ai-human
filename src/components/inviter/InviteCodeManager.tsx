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
      {/* Channel List Section */}
      <div className="p-6 border border-border rounded-3xl bg-card space-y-4 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-primary">
          活跃渠道
        </h3>
        <div className="space-y-2">
          {codes.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-full px-4 py-2 border rounded-xl text-left text-xs transition-all flex justify-between items-center group",
                copiedCode === item.code
                  ? "bg-primary/10 border-primary/30"
                  : "border-border hover:bg-muted/50",
              )}
            >
              <div className="flex flex-col">
                <span className="font-bold text-foreground">
                  {item.channel || "默认渠道"}
                </span>
                <span className="text-[10px] tabular-nums text-muted-foreground mr-2">
                  {item.usedCount} 次邀请 / {item.maxUses}
                </span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(item.code)}
                  className="p-1.5 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                  title="复制邀请码"
                >
                  {copiedCode === item.code ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                  title="删除频道"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}

          {codes.length < 5 && (
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  placeholder="新渠道名..."
                  className="flex-1 bg-muted border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <button
                  onClick={handleCreate}
                  disabled={isCreating || !channel.trim()}
                  className="px-3 py-1.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-1"
                >
                  <Plus className="size-3" />
                  {isCreating ? "创建中" : "创建"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Link Section (Prototype style) */}
      {codes.length > 0 && (
        <div className="p-6 border border-border rounded-3xl bg-card shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Info className="size-4" />
            </div>
            <h4 className="text-sm font-bold text-foreground">当前选中详情</h4>
          </div>
          <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
            <Info className="size-3" />
            点击上方渠道即可快速复制。默认受邀用户可获得相应等级权益。
          </p>
          <div className="bg-muted px-4 py-3 rounded-xl font-mono text-[11px] break-all select-all border border-border mb-3 text-foreground/80">
            {codes[0].code}
          </div>
          <button
            onClick={() => copyToClipboard(codes[0].code)}
            className="w-full py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            复制首选邀请码
          </button>
        </div>
      )}

      {codes.length === 0 && !isCreating && (
        <div className="border-2 border-dashed border-border rounded-3xl p-8 text-center bg-card/50">
          <p className="text-muted-foreground text-xs font-medium">
            尚未创建任何邀请渠道
          </p>
        </div>
      )}
    </div>
  );
}
