import { PrismaClient } from "@prisma/client";

const prismaClient = globalThis as unknown as { prisma?: PrismaClient};

export const prisma = 
    prismaClient.prisma ?? new PrismaClient();
    new PrismaClient({
        log: ['error', 'warn']
    });

if (process.env.NODE_ENV !== 'development') prismaClient.prisma = prisma;