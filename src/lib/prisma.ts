// import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from "./config";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
export default prisma;

export async function checkDbConnection(): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.info('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    throw error;
  }
}

export async function getDbHealth() {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: 'healthy',
      database: 'postgresql',
      latencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      database: 'postgresql',
      latencyMs: null,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
