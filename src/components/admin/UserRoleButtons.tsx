"use client";

import { useState } from "react";
import { updateUserRole } from "@/app/actions/user";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

interface Role {
  id: string;
  name: string;
}

export function UserRoleButtons({
  userId,
  currentRoles,
  allRoles,
}: {
  userId: string;
  currentRoles: string[];
  allRoles: Role[];
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleRole = async (roleName: string) => {
    setIsUpdating(true);
    try {
      let newRoles;
      if (currentRoles.includes(roleName)) {
        newRoles = currentRoles.filter((r) => r !== roleName);
      } else {
        newRoles = [...currentRoles, roleName];
      }
      // 保证至少有一个角色
      if (newRoles.length === 0) newRoles = ["USER"];

      await updateUserRole(userId, newRoles);
    } catch (e) {
      console.error(e);
      alert("更新失败");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      {allRoles.map((role) => {
        const isActive = currentRoles.includes(role.name);
        return (
          <button
            key={role.id}
            onClick={() => toggleRole(role.name)}
            disabled={isUpdating}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 border flex items-center gap-1.5",
              isActive
                ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-lg"
                : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300",
              isUpdating && "opacity-50 cursor-not-allowed",
            )}
          >
            {isActive && <Check className="size-3" />}
            {role.name}
          </button>
        );
      })}
      {isUpdating && (
        <Loader2 className="size-3 animate-spin text-zinc-500 ml-2" />
      )}
    </div>
  );
}
