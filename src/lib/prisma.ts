import { PrismaClient } from "@prisma/client";

if (process.env.PRISMA_CLIENT_ENGINE_TYPE === "client") {
    process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["warn", "error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
