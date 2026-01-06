import { z } from "zod";

// ---- Define schema for strict env validation ---- //
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NOTIFICATION_API_CLIENT_ID: z.string(),
  NOTIFICATION_API_CLIENT_SECRET: z.string(),
  ADMIN_EMAIL: z.string(),
  USER_URL: z.string().url(),
  ADMIN_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// ---- Parse and validate ---- //
const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NOTIFICATION_API_CLIENT_ID:process.env.NOTIFICATION_API_CLIENT_ID,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  NOTIFICATION_API_CLIENT_SECRET:process.env.NOTIFICATION_API_CLIENT_SECRET,
  USER_URL: process.env.NEXT_PUBLIC_USER_URL,
  ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const config = parsed.data;
