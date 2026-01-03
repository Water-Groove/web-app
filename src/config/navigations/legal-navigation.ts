import { NavLinks } from "@/types/nav";
import { FileText, Shield, HelpCircle } from "lucide-react";

export const legalNavItems: NavLinks[] = [
  {
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
    icon: Shield,
  },
  {
    title: "Terms & Conditions",
    href: "/legal/terms-conditions",
    icon: FileText,
  },
  {
    title: "Investment Disclaimer",
    href: "/legal/investment-disclaimer",
    icon: HelpCircle,
  },
  {
    title: "Refund & Withdrawal Policy",
    href: "/legal/refund-policy",
    icon: FileText,
  },
];
