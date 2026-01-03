import { redirect } from "next/navigation";
import { resolveServerAuth } from "@/lib/server/auth0-server";

export default async function PostLoginPage() {
  const { user, role } = await resolveServerAuth();
  console.log({user, role})
  if (!user) redirect("/");

  if (role === "admin" || role === "superadmin") {
    redirect("/admin/dashboard");
  }

  redirect("/dashboard");
}
