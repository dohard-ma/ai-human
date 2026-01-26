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
    <div className="flex items-center justify-end gap-1.5">
      {allRoles.map((role) => {
        const isActive = currentRoles.includes(role.name);
        return (
          <button
            key={role.id}
            onClick={() => toggleRole(role.name)}
            disabled={isUpdating}
            className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 border flex items-center gap-1.5 active:scale-95",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted text-muted-foreground border-border hover:border-primary/30 hover:text-primary",
              isUpdating && "opacity-50 cursor-not-allowed",
            )}
          >
            {isActive ? (
              <Check className="size-3 stroke-[3]" />
            ) : (
              <span className="size-3" />
            )}
            {role.name}
          </button>
        );
      })}
      {isUpdating && (
        <Loader2 className="size-3 animate-spin text-primary ml-1" />
      )}
    </div>
  );
}
