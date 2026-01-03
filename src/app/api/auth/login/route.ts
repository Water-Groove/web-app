import { auth0 } from "@/lib/server/auth0";

export async function GET() {
  return auth0.startInteractiveLogin({
    returnTo: `${process.env.NEXT_PUBLIC_BASE_URL}/post-login`
  });
}
