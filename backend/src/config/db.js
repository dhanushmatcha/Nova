import { PrismaClient } from '@prisma/client';

let prisma;

try {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error']
  });
} catch (e) {
  console.warn('[NOVA DB WARNING]: PrismaClient initialization skipped.');
  prisma = null;
}

export default prisma;
