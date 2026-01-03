import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-wg-neutral">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-20 w-20  rounded-lg flex items-center justify-center">
                <img 
                  src="/logo_t.png" 
                  alt="Water Grove Logo" 
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-wg-primary">Water Grove</h3>
                <p className="text-xs text-wg-primary/70">Investment Platform</p>
              </div>
            </div>

            <p className="text-sm text-wg-primary/80 leading-relaxed">
              A trusted investment platform providing access to carefully structured, 
              asset-backed investment opportunities with consistent monthly returns 
              and full transparency.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Phone className="h-4 w-4 text-wg-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-wg-primary">Phone Number</p>
                  <a 
                    href="tel:+2348035026480" 
                    className="text-sm text-wg-primary/80 hover:text-wg-accent transition-colors"
                  >
                    +234 803 502 6480
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Mail className="h-4 w-4 text-wg-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-wg-primary">Email Address</p>
                  <a 
                    href="mailto:Support@watergrooveinvestment.com" 
                    className="text-sm text-wg-primary/80 hover:text-wg-accent transition-colors break-all"
                  >
                    Support@watergrooveinvestment.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <MapPin className="h-4 w-4 text-wg-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-wg-primary">Office Address</p>
                  <p className="text-sm text-wg-primary/80">
                    Water Grove Investment Headquarters<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-wg-primary mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <Link 
                  href="#" 
                  aria-label="Facebook"
                  className="h-10 w-10 rounded-full bg-wg-primary/10 flex items-center justify-center hover:bg-wg-primary/20 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-wg-primary/80 hover:text-wg-accent transition-colors" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="Instagram"
                  className="h-10 w-10 rounded-full bg-wg-primary/10 flex items-center justify-center hover:bg-wg-primary/20 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-wg-primary/80 hover:text-wg-accent transition-colors" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="Twitter"
                  className="h-10 w-10 rounded-full bg-wg-primary/10 flex items-center justify-center hover:bg-wg-primary/20 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-wg-primary/80 hover:text-wg-accent transition-colors" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="LinkedIn"
                  className="h-10 w-10 rounded-full bg-wg-primary/10 flex items-center justify-center hover:bg-wg-primary/20 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-wg-primary/80 hover:text-wg-accent transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-wg-primary">Quick Links</h4>
            <ul className="space-y-3 text-sm text-wg-primary/80">
              <li>
                <Link 
                  href="/" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/how-it-works" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  href="/investment-sectors" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Investment Sectors
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact-us" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Investment Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-wg-primary">Investment</h4>
            <ul className="space-y-3 text-sm text-wg-primary/80">
              <li>
                <Link 
                  href="/register" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Start Investing
                </Link>
              </li>
              <li>
                <Link 
                  href="/investment-sectors" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Investment Packages
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <CheckCircle className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  FAQ
                </Link>
              </li>
            </ul>

            {/* Minimum Investment Badge */}
            <div className="mt-6 p-3 rounded-lg bg-wg-primary/5 border border-wg-primary/20">
              <p className="text-xs font-medium text-wg-primary mb-1">Minimum Investment</p>
              <p className="text-lg font-bold text-wg-secondary">₦100,000</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-wg-primary">Legal</h4>
            <ul className="space-y-3 text-sm text-wg-primary/80">
              <li>
                <Link 
                  href="/legal/privacy-policy" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <Shield className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/terms-conditions" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <Shield className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/investment-disclaimer" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <Shield className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Investment Disclaimer
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/refund-policy" 
                  className="hover:text-wg-accent transition-colors flex items-center gap-2 group"
                >
                  <Shield className="h-3 w-3 text-wg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Refund & Withdrawal Policy
                </Link>
              </li>
            </ul>

            {/* Quick Contact CTA */}
            <div className="mt-6">
              <Link href="/contact-us">
                <Button 
                  variant="outline" 
                  className="w-full border-wg-primary/30 text-wg-primary hover:bg-wg-primary/10 hover:text-wg-primary hover:border-wg-accent transition-all duration-300"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-8 bg-wg-primary/20" />

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
            <div className="p-2 rounded-full bg-wg-secondary/20">
              <Shield className="h-5 w-5 text-wg-secondary" />
            </div>
            <div>
              <p className="text-xs font-medium text-wg-primary">Asset-Backed</p>
              <p className="text-xs text-wg-primary/70">All Investments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
            <div className="p-2 rounded-full bg-wg-secondary/20">
              <CheckCircle className="h-5 w-5 text-wg-secondary" />
            </div>
            <div>
              <p className="text-xs font-medium text-wg-primary">Monthly Returns</p>
              <p className="text-xs text-wg-primary/70">Consistent ROI</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
            <div className="p-2 rounded-full bg-wg-secondary/20">
              <CheckCircle className="h-5 w-5 text-wg-secondary" />
            </div>
            <div>
              <p className="text-xs font-medium text-wg-primary">98% Success</p>
              <p className="text-xs text-wg-primary/70">On-time Payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
            <div className="p-2 rounded-full bg-wg-secondary/20">
              <CheckCircle className="h-5 w-5 text-wg-secondary" />
            </div>
            <div>
              <p className="text-xs font-medium text-wg-primary">2,500+ Investors</p>
              <p className="text-xs text-wg-primary/70">Active Community</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-wg-primary/70 md:flex-row md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>
              © {new Date().getFullYear()} Water Grove Investment Platform.
              All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="/legal/privacy-policy" 
                className="hover:text-wg-accent transition-colors text-xs"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal/terms-conditions" 
                className="hover:text-wg-accent transition-colors text-xs"
              >
                Terms of Service
              </Link>
              <Link 
                href="/legal/investment-disclaimer" 
                className="hover:text-wg-accent transition-colors text-xs"
              >
                Risk Disclosure
              </Link>
            </div>
          </div>

          <div className="text-xs text-wg-primary/60">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <Shield className="h-3 w-3 text-wg-secondary" />
              Built with transparency, discipline, and long-term value.
            </p>
            <p className="mt-1 text-[10px]">
              Investment involves risk. Past performance does not guarantee future results.
              Please read all legal documents before investing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}