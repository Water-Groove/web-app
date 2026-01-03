import { NavLinks } from "@/types/nav";
import {
  Info,
  Phone,
  FileText,
  Shield,
  HelpCircle,
  Layers,
} from "lucide-react";

export const publicNavItems:NavLinks[] = [
  {
    title: "How It Works",
    href: "/how-it-works",
    icon: Layers,
  },
  {
    title: "Investment Sectors",
    href: "/investment-sectors",
    icon: Info,
  },
  {
    title: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    icon: Phone,
  },
];
