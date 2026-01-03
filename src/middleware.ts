import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/server/auth0";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Always allow Auth0 internal routes
  if (pathname.startsWith("/auth")) {
    return auth0.middleware(req);
  }

  // Protect app routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    return auth0.middleware(req);
  }

  return NextResponse.next();
}
