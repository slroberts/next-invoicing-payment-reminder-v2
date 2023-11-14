import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient | undefined;
}

const prismaGlobal = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  if (!globalThis.prisma) {
    globalThis.prisma = prismaGlobal;
  }
}

export const db = prismaGlobal;
