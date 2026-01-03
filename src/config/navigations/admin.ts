import { NavLinks } from "@/types/nav";
import {
  Users,
  ShieldCheck,
  Banknote,
  FileBarChart,
  BanknoteArrowDown,
  BanknoteArrowUp,
  PiggyBank,
  BanknoteX,
} from "lucide-react";


export const adminNavItems: NavLinks[] = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: ShieldCheck,
  },
  {
    title: "Investors",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Investments",
    href: "/admin/investments",
    icon: PiggyBank,
  },
  {
    title: "Deposits",
    href: "/admin/deposits",
    icon: BanknoteArrowUp,
  },
  {
    title: "Withdrawals",
    href: "/admin/withdrawals",
    icon: BanknoteArrowDown,
  },
   {
    title: "ROI Return",
    href: "/admin/rois",
    icon: Banknote,
  },
  {
    title: "Penalties",
    href: "/admin/penalties",
    icon: BanknoteX,
  },
  // {
  //   title: "Reports",
  //   href: "/admin/reports",
  //   icon: FileBarChart,
  // },
];
