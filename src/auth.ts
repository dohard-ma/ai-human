import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import {
  verifyCode,
  validateInviteCode,
  markInviteCodeAsUsed,
} from "@/lib/auth-service";

// 扩展 NextAuth 的类型定义
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      canInvite: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    roles?: string[];
    canInvite?: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "VerificationCode",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
        inviteCode: { label: "Invite Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) {
          return null;
        }

        const email = credentials.email as string;
        const code = credentials.code as string;
        const inviteCode = credentials.inviteCode as string;

        // 1. 验证码校验
        const isCodeValid = await verifyCode(email, code);
        if (!isCodeValid) {
          throw new Error("验证码无效或已过期");
        }

        // 2. 查找用户
        let userRecord = await prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              include: { role: true },
            },
          },
        });

        // 3. 如果是新用户，必须校验邀请码
        if (!userRecord) {
          if (!inviteCode) {
            throw new Error("新用户注册需要提供邀请码");
          }

          const { valid, creatorId, inviteId } =
            await validateInviteCode(inviteCode);
          if (!valid) {
            throw new Error("邀请码无效或已过期");
          }

          // 创建用户并分配角色
          const defaultRole = await prisma.role.findUnique({
            where: { name: "USER" },
          });

          userRecord = await prisma.user.create({
            data: {
              email,
              emailVerified: new Date(),
              invitedById: creatorId,
              usedInviteCodeId: inviteId,
              roles: defaultRole
                ? {
                  create: { roleId: defaultRole.id },
                }
                : undefined,
            },
            include: {
              roles: {
                include: { role: true },
              },
            },
          });

          // 使用邀请码
          await markInviteCodeAsUsed(inviteCode);
        }

        return {
          id: userRecord.id,
          name: userRecord.name,
          email: userRecord.email,
          image: userRecord.image,
          roles: userRecord.roles.map((ur) => ur.role.name),
          canInvite: userRecord.roles.some((ur) => ur.role.canInvite),
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles ?? [];
        token.canInvite = user.canInvite ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.roles = (token.roles as string[]) ?? [];
        session.user.canInvite = (token.canInvite as boolean) ?? false;
      }
      return session;
    },
  },
});
