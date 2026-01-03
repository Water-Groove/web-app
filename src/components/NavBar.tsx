/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading } = useUser();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const navLinks = [
    { href: "/about", title: "About Us" },
    { href: "/how-it-works", title: "How It Works" },
    { href: "/investment-sectors", title: "Investment Sectors" },
    { href: "/contact", title: "Contact" },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-sidebar border-b border-sidebar-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center">
                <img 
                  src="/logo_t.png" 
                  alt="Water Grove Logo" 
                  width={100} 
                  height={100} 
                  className="h-20 w-20"
                />
              </div>
              <span className="text-lg font-bold text-wg-primary">
                Water Grove
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive 
                      ? "bg-wg-primary text-wg-secondary" 
                      : "text-wg-primary hover:bg-wg-secondary/50 hover:text-wg-primary"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2 pl-4 border-l border-sidebar-border">
                  <Avatar className="h-8 w-8">
                    {user?.picture ? (
                      <AvatarImage src={user.picture} alt={user.name || "User"} />
                    ) : (
                      <AvatarFallback className="bg-sidebar-primary text-wg-secondary">
                        {user?.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center rounded-lg p-2 text-sm text-wg-primary/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <Button variant="ghost" className="text-wg-primary hover:text-wg-primary hover:bg-wg-secondary/50">
                    Login
                  </Button>
                </Link>
                <Link href="/api/auth/login">
                  <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE: Hamburger Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-wg-primary hover:text-wg-primary hover:bg-wg-secondary/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent 
                side="right" 
                className="w-full sm:w-80 h-full p-0 bg-sidebar border-l border-sidebar-border"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-6 border-b border-sidebar-border">
                    <Link 
                      href="/" 
                      className="flex items-center gap-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Image 
                          src="/logo_t.png" 
                          alt="Water Grove Logo" 
                          width={32} 
                          height={32} 
                          className="h-8 w-auto"
                        />
                      </div>
                      <span className="text-lg font-bold text-wg-primary">
                        Water Grove
                      </span>
                    </Link>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col gap-1">
                      {navLinks.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                              isActive
                                ? "bg-wg-primary text-wg-secondary"
                                : "text-wg-primary hover:bg-wg-secondary/50 hover:text-wg-primary"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>

                    <Separator className="my-4 bg-sidebar-border" />

                    {/* Mobile Action Buttons */}
                    <div className="space-y-3">
                      {user ? (
                        <>
                          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary">
                              Dashboard
                            </Button>
                          </Link>
                          
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/10">
                            <Avatar className="h-10 w-10">
                              {user?.picture ? (
                                <AvatarImage src={user.picture} alt={user.name || "User"} />
                              ) : (
                                <AvatarFallback className="bg-sidebar-primary text-wg-secondary">
                                  {user?.name ? getInitials(user.name) : "U"}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-wg-primary truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-wg-primary/60 truncate">
                                {user.email}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center justify-center rounded-lg p-2 text-sm text-wg-primary/70 hover:bg-destructive/10 hover:text-destructive transition-color cursor-pointer"
                            >
                              <LogOut className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link href="/api/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full text-wg-primary border-sidebar-border hover:bg-wg-secondary/50">
                              Login
                            </Button>
                          </Link>
                          <Link href="/api/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-wg-primary hover:bg-wg-primary/90 text-wg-secondary">
                              Get Started
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;