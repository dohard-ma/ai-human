import type { NextAuthConfig } from "next-auth";

// 这里仅包含 Edge 运行时兼容的配置
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      console.log(
        `[Auth Middleware] Path: ${pathname}, LoggedIn: ${isLoggedIn}`,
      );

      const isOnWelcome = pathname.startsWith("/welcome");
      const isOnSignIn = pathname.startsWith("/sign-in");
      const isApiAuth = pathname.startsWith("/api/auth");

      if (isLoggedIn) {
        if (isOnWelcome || isOnSignIn) {
          console.log(
            `[Auth Middleware] Redirecting logged in user from ${pathname} to /`,
          );
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      // 未登录时：
      // 允许访问欢迎页、登录页以及 Auth API 路由
      if (isOnWelcome || isOnSignIn || isApiAuth) {
        return true;
      }

      // 其他页面全部重定向到欢迎页
      console.log(
        `[Auth Middleware] Redirecting unauthenticated user from ${pathname} to /welcome`,
      );
      return Response.redirect(new URL("/welcome", nextUrl));
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // 提供者在 auth.ts 中完整定义
} satisfies NextAuthConfig;
