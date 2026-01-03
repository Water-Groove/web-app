export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { getDbHealth } from "@/lib/prisma";

export async function GET() {
  console.log('Endpoint reached')
  const prisma = await getDbHealth();

  const statusCode = prisma.status === "healthy" ? 200 : 503;

  return NextResponse.json(
    {
      status: prisma.status,
      services: {
        database: prisma,
      },
    },
    { status: statusCode }
  );
}
