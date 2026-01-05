import { z } from "zod";

// ---- Define schema for strict env validation ---- //
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NOTIFICATION_API_CLIENT_ID: z.string(),
  NOTIFICATION_API_CLIENT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// ---- Parse and validate ---- //
const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NOTIFICATION_API_CLIENT_ID:process.env.NOTIFICATION_API_CLIENT_ID,
  NOTIFICATION_API_CLIENT_SECRET:process.env.NOTIFICATION_API_CLIENT_SECRET,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const config = parsed.data;
