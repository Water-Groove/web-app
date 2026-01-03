import { NavLinks } from "@/types/nav";
import { Home, Activity, CreditCard, Wallet, Star, User } from "lucide-react";

export const dashboardNavItems: NavLinks[] = [
  { title: "Overview", href: "/dashboard", icon: Home },
  { title: "Investments", href: "/dashboard/investments", icon: Activity },
  { title: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  // { title: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  // { title: "Upgrade Tier", href: "/dashboard/upgrade-tier", icon: Star },
];
