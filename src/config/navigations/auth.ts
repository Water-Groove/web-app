import { NavLinks } from "@/types/nav";

export const authNavItems: NavLinks[] = [
  {
    title: "Login",
    href: "/api/auth/login",
  },
  {
    title: "Get Started",
    href: "/auth/register",
    variant: "primary",
  },
];
