"use client";

import Link from "next/link";
import {
  ChevronRight,
  Headset,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { NavLinks } from "@/types/nav";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { AuthData } from "@/types/type";
import { Button } from "./ui/button";

interface SidebarProps {
  pathname: string;
  onNavigate: () => void;
  navItem: NavLinks[];
  secondaryNavItems: NavLinks[];
  authUser: AuthData;
}

export function DashboardSidebar({
  pathname,
  onNavigate,
  navItem,
  authUser,
  secondaryNavItems,
}: SidebarProps) {
  const router = useRouter();

  const { user, error, isLoading } = authUser;

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const SUPPORT_MESSAGE = encodeURIComponent(
    `Hello Water Groove Support Team,

    I need assistance regarding my investment account.
    Please assign this message to my line manager for prompt support.

    Thank you.`
  );
  const WHATSAPP_NUMBER = "2348035026480";

  const getSupportWhatsappLink = () => {
    return window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${SUPPORT_MESSAGE}`;
  };

  return (
    <div className="flex h-screen w-64 lg:w-72 flex-col fixed bg-wg-neutral border-r border-wg-accent">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/logo_t.png" alt="WG_logo" width={50} height={50} />
          <span className="text-lg font-bold text-wg-primary hover:text-wg-secondary">
            Water Groove
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItem.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                active
                  ? "bg-wg-primary text-wg-secondary"
                  : "text-wg-primary hover:bg-wg-secondary/50 hover:text-wg-primary"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span className="flex-1">{item.title}</span>
              {active && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Secondary Section */}
      <div className="overflow-y-auto px-3 py-4">
        {/* Secondary Navigation */}
        <nav className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <>
                {item.title === "Support" ? (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={clsx(
                      "w-full justify-start h-auto px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      "text-wg-primary hover:bg-wg-secondary/50 hover:text-wg-primary"
                    )}
                    onClick={getSupportWhatsappLink}
                  >
                    {Icon && <Icon className="h-4 w-4 mr-3" />}
                    <span>{item.title}</span>
                  </Button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.title === "Support" ? "#" : item.href}
                    onClick={
                      item.title === "Support"
                        ? getSupportWhatsappLink
                        : onNavigate
                    }
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      isActive
                        ? "bg-wg-primary text-wg-secondary"
                        : "text-wg-primary hover:bg-wg-secondary/50 hover:text-wg-primary"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="px-2 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-sidebar-border">
              {user?.picture ? (
                <AvatarImage src={user.picture} alt={user.name || "User"} />
              ) : (
                <AvatarFallback className="bg-sidebar-primary text-wg-secondary">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-2 bg-sidebar-accent" />
                  <Skeleton className="h-3 w-16 bg-sidebar-accent" />
                </>
              ) : error ? (
                <>
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    Error loading user
                  </p>
                  <p className="text-xs text-sidebar-foreground/60">
                    Please refresh
                  </p>
                </>
              ) : user ? (
                <>
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user.email}
                  </p>
                  {user.role && (
                    <p className="text-xs font-bold text-wg-accent truncate">
                      {user.role}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-sidebar-foreground">
                    Guest
                  </p>
                  <p className="text-xs text-sidebar-foreground/60">
                    Not signed in
                  </p>
                </>
              )}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center rounded-sm p-2 bg-wg-primary/10 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
