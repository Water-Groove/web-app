/* eslint-disable react-hooks/purity */
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Wallet,
  Package,
  Zap,
  TrendingUp,
  Download,
  ArrowRight,
  CheckCircle,
  Eye,
  Shield,
  BarChart3,
  Clock,
  HelpCircle,
  Phone,
  Lock,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HowItWorksClient = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: "01",
      icon: <Users className="h-10 w-10" />,
      title: "Create an Account",
      description: "Sign up on the Water Grove platform with your basic details and gain access to your personal investment dashboard",
      details: [
        "Complete registration with email",
        "Access personal investment dashboard",
        "Verify account for security",
      ],
      time: "2-5 minutes",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      number: "02",
      icon: <Wallet className="h-10 w-10" />,
      title: "Fund Your Wallet",
      description: "Make a deposit through approved payment channels with manual admin confirmation",
      details: [
        "Choose deposit amount (minimum ₦100,000)",
        "Select payment method",
        "Upload payment confirmation",
      ],
      time: "10-15 minutes",
      color: "from-emerald-500/20 to-green-500/20",
    },
    {
      number: "03",
      icon: <Package className="h-10 w-10" />,
      title: "Choose Investment Package",
      description: "Select an investment plan that matches your capital and investment goals",
      details: [
        "Browse investment packages",
        "Select based on investment amount",
        "Auto-assign investor category",
      ],
      time: "5-10 minutes",
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      number: "04",
      icon: <Zap className="h-10 w-10" />,
      title: "Investment Activation",
      description: "Once your payment is confirmed, your investment becomes active and begins generating returns",
      details: [
        "Manual confirmation by admin team",
        "Investment activation notification",
        "Start earning returns immediately",
      ],
      time: "1-4 hours",
      color: "from-rose-500/20 to-pink-500/20",
    },
    {
      number: "05",
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Earn Monthly ROI",
      description: "Returns are calculated monthly and credited to your dashboard, allowing real-time monitoring",
      details: [
        "Monthly ROI calculations",
        "Real-time dashboard updates",
        "Performance tracking tools",
      ],
      time: "Monthly",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      number: "06",
      icon: <Download className="h-10 w-10" />,
      title: "Request Withdrawal",
      description: "Withdraw directly from your dashboard with manual review by our admin team",
      details: [
        "Submit withdrawal request",
        "Manual review and approval",
        "Funds transferred securely",
      ],
      time: "24-48 hours",
      color: "from-sky-500/20 to-blue-500/20",
    },
  ];

  const investmentCategories = [
    {
      name: "Starter Groove",
      range: "₦100K – ₦499K",
      icon: <Users className="h-6 w-6" />,
      projects: "50+ Active",
      description: "Perfect for new investors starting their journey",
    },
    {
      name: "Growth Groove",
      range: "₦500K – ₦1M",
      icon: <TrendingUp className="h-6 w-6" />,
      projects: "35+ Active",
      description: "For investors looking to scale their portfolio",
    },
    {
      name: "Premium Groove",
      range: "₦1M – ₦5M",
      icon: <Shield className="h-6 w-6" />,
      projects: "25+ Active",
      description: "Advanced investment opportunities",
    },
    {
      name: "Elite Investor",
      range: "₦5M – ₦10M",
      icon: <BarChart3 className="h-6 w-6" />,
      projects: "15+ Active",
      description: "High-value investment portfolio",
    },
  ];

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: "The minimum investment is ₦100,000. This allows anyone to start building wealth with Water Grove.",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      question: "How often is ROI paid?",
      answer: "ROI is calculated and credited monthly to your dashboard, allowing real-time tracking of your returns.",
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      question: "Are withdrawals automatic?",
      answer: "No. All withdrawals are reviewed and processed manually by our admin team to ensure accuracy and security.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      question: "Is my investment guaranteed?",
      answer: "All investments carry risk. Water Grove does not guarantee profits but applies structured risk management strategies.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      question: "Can I reinvest my earnings?",
      answer: "Yes. Earnings can be reinvested directly from your wallet to compound your returns.",
      icon: <RefreshCw className="h-6 w-6" />,
    },
    {
      question: "How do I track my investment?",
      answer: "Your dashboard provides real-time access to balances, ROI history, and complete transaction records.",
      icon: <Eye className="h-6 w-6" />,
    },
  ];

  // Auto-rotate active step for demo effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setActiveStep(prev => prev === null || prev >= steps.length - 1 ? 0 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section - Same as homepage */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-wg-accent/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-wg-secondary/90 text-wg-primary hover:bg-wg-secondary/80 border-none animate-pulse animate-duration-2000">
              <TrendingUp className="mr-2 h-4 w-4" />
              STEP-BY-STEP: HOW IT WORKS
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6 leading-tight">
              Simple
              <span className="block text-wg-secondary mt-2">6-Step Process</span>
            </h1>

            <p className="text-lg md:text-xl text-wg-neutral/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Water Grove provides a clear, structured 6-step process to start earning 
              consistent monthly returns with transparency and control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Investing Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/investment-sectors">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300"
                >
                  View Investment Packages
                </Button>
              </Link>
            </div>

            {/* Minimum investment badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-primary border border-wg-accent">
              <Lock className="h-4 w-4 text-wg-secondary" />
              <span className="text-sm text-wg-neutral">Minimum Investment: <span className="font-bold text-wg-secondary">₦100,000</span></span>
            </div>
          </div>
        </div>
        
        {/* Decorative wave - Same as homepage */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-wg-primary2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Animated Steps Section */}
      <section className="py-20 bg-gradient-to-b from-wg-neutral to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-primary mb-4">
              The <span className="text-wg-secondary">Water Grove</span> Way
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Our structured 6-step process ensures transparency and control at every stage
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className={`relative overflow-hidden border-2 transition-all duration-500 group cursor-pointer
                  ${activeStep === index ? 'border-wg-accent shadow-2xl scale-105' : 'border-wg-primary/10 hover:border-wg-accent/50'}
                  ${hoveredStep === index ? 'transform -translate-y-2' : ''}
                `}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setActiveStep(index)}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Active indicator */}
                {activeStep === index && (
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping bg-wg-accent/40 rounded-full"></div>
                      <div className="relative w-3 h-3 rounded-full bg-wg-accent"></div>
                    </div>
                  </div>
                )}
                
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary2 text-wg-neutral flex items-center justify-center text-lg font-bold shadow-lg">
                  {step.number}
                </div>
                
                <CardHeader className="pt-10 pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-2xl transition-all duration-500 group-hover:scale-110
                      ${activeStep === index ? 'bg-wg-accent/20' : 'bg-wg-primary/10'}`}
                    >
                      <div className={`transition-colors duration-500
                        ${activeStep === index ? 'text-wg-accent' : 'text-wg-primary group-hover:text-wg-accent'}`}
                      >
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  <Badge className="mb-3 bg-wg-secondary/20 text-wg-primary border-wg-secondary/30 w-fit mx-auto">
                    <Clock className="mr-1 h-3 w-3" />
                    {step.time}
                  </Badge>
                  
                  <CardTitle className={`text-xl font-bold text-center transition-colors duration-500
                    ${activeStep === index ? 'text-wg-accent' : 'text-wg-primary'}`}
                  >
                    {step.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-wg-primary/70 mb-4 text-center leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-wg-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-wg-primary/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                {/* Progress bar animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-wg-primary/10 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-wg-secondary to-wg-accent transition-all duration-1000
                    ${hoveredStep === index ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Manual Oversight Banner */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-wg-primary/10 via-wg-secondary/5 to-wg-accent/5 rounded-2xl p-8 border border-wg-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-xl bg-wg-primary/10">
                  <Shield className="h-8 w-8 text-wg-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-wg-primary mb-2">
                    Manual Oversight Advantage
                  </h3>
                  <p className="text-wg-primary/70">
                    All payments are confirmed manually by our admin team for accuracy and transparency. 
                    Your investor category is automatically assigned based on your investment amount.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Categories - Same style as homepage */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
              Investment <span className="text-wg-secondary">Categories</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Select an investment plan that matches your capital
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {investmentCategories.map((category, index) => (
              <Card 
                key={index} 
                className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-xl group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-wg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-wg-primary/10 group-hover:bg-wg-accent/10 transition-colors duration-300">
                      <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                        {category.icon}
                      </div>
                    </div>
                    <Badge className="bg-wg-secondary/20 text-wg-primary border-wg-secondary/30">
                      {category.projects}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-wg-primary">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="text-lg font-bold text-wg-secondary mb-3">
                    {category.range}
                  </div>
                  <p className="text-sm text-wg-primary/70 mb-4">
                    {category.description}
                  </p>
                  <div className="text-xs text-wg-primary/50">
                    Includes: Clearly defined terms • Monthly ROI • Dashboard visibility
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-wg-primary/60 text-sm max-w-2xl mx-auto mb-6">
              Executive Groove category (₦10,000,000 and above) available for institutional investors
            </p>
            <Link href="/investment-packages">
              <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group">
                View Detailed Packages
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
              Frequently Asked <span className="text-wg-secondary">Questions</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Everything you need to know about investing with Water Grove
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-lg group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-wg-primary/10 group-hover:bg-wg-accent/10 transition-colors duration-300">
                        <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                          {faq.icon}
                        </div>
                      </div>
                      <CardTitle className="text-base font-bold text-wg-primary">
                        {faq.question}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-wg-primary/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-r from-wg-primary to-wg-primary2 rounded-2xl p-8 shadow-xl mb-8 max-w-3xl mx-auto">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-wg-neutral mb-2">
                    Still Have Questions?
                  </h3>
                  <p className="text-wg-neutral/80">
                    Our support team is here to help you get started
                  </p>
                </div>
                
                <Link href="/contact">
                  <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Contact Support
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Same as homepage */}
      <section className="py-20 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-wg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-neutral mb-6">
              Ready to <span className="text-wg-secondary">Start Earning</span> Monthly Returns?
            </h2>
            
            <div className="bg-wg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-wg-accent/20 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 mb-8 leading-relaxed">
                Join thousands of investors who trust Water Grove for structured, transparent, and asset-backed investment opportunities. 
                Start with just <span className="text-wg-secondary font-bold">₦100,000</span> and grow your capital across diversified sectors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Shield className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">Asset-Backed</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-accent/20">
                    <TrendingUp className="h-5 w-5 text-wg-accent" />
                  </div>
                  <span className="text-wg-neutral font-medium">Monthly Returns</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Eye className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">Full Transparency</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Investing Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Risk disclaimer */}
            <div className="mt-10 pt-8 border-t border-wg-neutral/20">
              <p className="text-wg-neutral/80 text-sm mb-2">
                <span className="font-bold">Important:</span> All investments carry risk. Water Grove does not guarantee profits but applies structured risk management.
              </p>
              <p className="text-wg-neutral/60 text-xs">
                Past performance is not indicative of future results. Please review investment terms carefully.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HowItWorksClient;