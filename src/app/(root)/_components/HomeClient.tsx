/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Users, 
  BarChart3, 
  Target,
  CheckCircle,
  ArrowRight,
  Building,
  Leaf,
  Truck,
  Utensils,
  FileText,
  Building2,
  Fuel,
  Wallet,
  Package,
  Zap,
  PieChart,
  RefreshCw,
  Download,
  Eye,
  Sparkles,
  DollarSign,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InvestmentSectors from './InvestmentSectors';
import StatsSection from './StatsSection';
import ProcessSteps from './ProcessSteps';
import Features from './Features';
import CTASection from './CTASection';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const HomeClient = () => {
  const investmentSectors = [
    {
      icon: <Building className="h-10 w-10" />,
      title: 'Real Estate & Land Banking',
      description: 'Strategic land acquisitions, residential developments, and property assets in high-growth areas',
      projects: 24,
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: <Leaf className="h-10 w-10" />,
      title: 'Agricultural Investments',
      description: 'Scalable agricultural projects including crop farming, processing, and distribution',
      projects: 18,
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: 'Logistics Operations',
      description: 'Transportation, distribution, and fulfillment services across various industries',
      projects: 15,
      color: 'from-orange-500/20 to-amber-500/20'
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: 'Food & Event Businesses',
      description: 'Food production, catering, and event-related ventures with strong market demand',
      projects: 22,
      color: 'from-rose-500/20 to-pink-500/20'
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: 'Structured Loans',
      description: 'Vetted loan products with defined repayment terms and controlled risk exposure',
      projects: 35,
      color: 'from-purple-500/20 to-violet-500/20'
    },
    {
      icon: <Building2 className="h-10 w-10" />,
      title: 'Public Financing',
      description: 'Public and private sector project financing with predefined returns',
      projects: 12,
      color: 'from-sky-500/20 to-blue-500/20'
    },
    {
      icon: <Fuel className="h-10 w-10" />,
      title: 'Oil & Gas Ventures',
      description: 'Downstream and service-based operations with clear revenue channels',
      projects: 8,
      color: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  const stats = [
    { value: '₦10B+', label: 'Platform Investments', icon: <DollarSign className="h-5 w-5" />, color: 'text-wg-secondary' },
    { value: '2,500+', label: 'Active Investors', icon: <Users className="h-5 w-5" />, color: 'text-wg-accent' },
    { value: '45+', label: 'Completed Projects', icon: <CheckCircle className="h-5 w-5" />, color: 'text-wg-secondary' },
    { value: '98%', label: 'On-time ROI Payments', icon: <TrendingUp className="h-5 w-5" />, color: 'text-wg-accent' }
  ];

  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: 'Asset-Backed Investments',
      description: 'All opportunities backed by real economic activities and tangible assets',
      gradient: 'from-wg-primary/10 to-wg-accent/10'
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: 'Monthly Returns',
      description: 'Consistent monthly ROI structure with transparent reporting',
      gradient: 'from-wg-secondary/10 to-amber-500/10'
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: 'Professional Management',
      description: 'Managed by experienced professionals with sector-specific expertise',
      gradient: 'from-wg-primary/20 to-wg-primary2/10'
    },
    {
      icon: <PieChart className="h-7 w-7" />,
      title: 'Portfolio Diversification',
      description: 'Spread investments across 7+ sectors to minimize risk exposure',
      gradient: 'from-wg-accent/10 to-blue-500/10'
    },
    {
      icon: <Eye className="h-7 w-7" />,
      title: 'Full Transparency',
      description: 'Manual confirmation of all transactions with clear investment terms',
      gradient: 'from-wg-secondary/20 to-wg-primary/10'
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: 'Reinvestment Options',
      description: 'Automatically reinvest earnings directly from your wallet',
      gradient: 'from-wg-primary/10 to-wg-accent/20'
    }
  ];

  const processSteps = [
    {
      step: '01',
      icon: <Users className="h-6 w-6" />,
      title: 'Create an Account',
      description: 'Sign up with basic details and access your personal investment dashboard',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      step: '02',
      icon: <Package className="h-6 w-6" />,
      title: 'Choose Investment Package',
      description: 'Select a plan matching your capital (₦100k minimum)',
      gradient: 'from-orange-500/20 to-amber-500/20'
    },
    {
      step: '03',
      icon: <Wallet className="h-6 w-6" />,
      title: 'Fund Your Wallet',
      description: 'Deposit through approved payment channels with manual admin confirmation',
      gradient: 'from-emerald-500/20 to-green-500/20'
    },
    {
      step: '04',
      icon: <Zap className="h-6 w-6" />,
      title: 'Investment Activation',
      description: 'Once confirmed, your investment becomes active and starts generating returns',
      gradient: 'from-rose-500/20 to-pink-500/20'
    },
    {
      step: '05',
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Earn Monthly ROI',
      description: 'Returns calculated monthly and credited to your dashboard in real-time',
      gradient: 'from-purple-500/20 to-violet-500/20'
    },
    {
      step: '06',
      icon: <Download className="h-6 w-6" />,
      title: 'Request Withdrawal',
      description: 'Withdraw directly from dashboard (manually reviewed by admin team)',
      gradient: 'from-sky-500/20 to-blue-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-primary/5 via-white to-wg-primary/5 overflow-hidden">
      {/* Hero Section - Simplified */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 bg-gradient-to-br from-wg-primary via-wg-primary2 to-wg-primary/90">
        {/* Business-focused background image */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/business-pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Subtle top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text Content */}
              <div>
                {/* Trust badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                  <CheckCircle className="h-4 w-4 text-wg-secondary" />
                  <span className="text-sm font-semibold text-white">Invest With Confidence. Grow With Purpose.</span>
                </div>
                
                {/* Main headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Build Wealth
                  <span className="block text-wg-secondary mt-2">
                    With Water Grove
                  </span>
                </h1>
                
                {/* Subheadline */}
                <div className="mb-10">
                  <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                    Water Grove Investment Platform provides access to carefully structured, asset-backed 
                    investment opportunities across real estate, agriculture, logistics, public financing, and more — 
                    designed to deliver consistent monthly returns with transparency and control.
                  </p>
                  
                  {/* Highlight box */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <p className="text-white font-medium italic relative">
                      <span className="absolute -left-4 top-0 text-wg-secondary text-2xl">"</span>
                      Whether you are starting with <span className="text-wg-secondary font-bold">₦100,000</span> or investing at a larger scale, 
                      Water Grove offers a clear pathway to grow your capital responsibly.
                      <span className="absolute -right-4 bottom-0 text-wg-secondary text-2xl">"</span>
                    </p>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button 
                      size="lg" 
                      className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="flex items-center">
                        Start Investing Today 
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </Link>
                  <Link href="/investment-sectors">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white bg-wg-primary text-white hover:bg-white/20 hover:text-white hover:border-white px-8 py-6 text-base rounded-xl transition-all duration-300"
                    >
                      View Investment Packages
                    </Button>
                  </Link>
                </div>
                
                {/* Minimum investment info */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Target className="h-4 w-4 text-wg-secondary" />
                    <span className="text-sm text-white">Minimum Investment: <span className="font-bold text-wg-secondary">₦100,000</span></span>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-2 text-white/70">
                    <CheckCircle className="h-4 w-4 text-wg-secondary" />
                    <span className="text-sm">Asset-Backed</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Business Image */}
              <div className="relative">
                {/* Main business image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[400px]">
                  {/* Professional business meeting image */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/hero.jpg"
                      alt="Professional investment team discussing business strategy"
                      fill
                      
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-wg-secondary p-2 rounded-lg">
                          <Users className="h-6 w-6 text-wg-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Professional Investment Team</h3>
                      </div>
                      <p className="text-white/90 text-sm mb-4">
                        Our experienced team carefully evaluates and manages every investment opportunity
                      </p>
                      
                      {/* Stats overlay */}
                      <div className="flex justify-between bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-center">
                          <p className="text-white font-bold text-xl">10+</p>
                          <p className="text-white/80 text-xs">Years Experience</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-bold text-xl">98%</p>
                          <p className="text-white/80 text-xs">Satisfaction Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-bold text-xl">₦10B+</p>
                          <p className="text-white/80 text-xs">Managed Assets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sector badges */}
                <div className="absolute -top-4 -left-4 bg-wg-secondary text-wg-primary px-4 py-2 rounded-lg font-bold shadow-lg">
                  Multi-Sector Portfolio
                </div>
                <div className="absolute -bottom-4 -right-4 bg-wg-accent text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  Asset-Backed
                </div>
              </div>
            </div>
            
            {/* Quick stats bar */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg className="w-full h-12 text-wg-primary" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Investment Sectors */}
      <InvestmentSectors sectors={investmentSectors} />

      {/* How It Works */}
      <ProcessSteps steps={processSteps} />

      {/* Features / Why Choose Us */}
      <Features features={features} />

      {/* CTA Section */}
      <CTASection />

      {/* Floating action button for quick access */}
      <Link href="/register" className="fixed bottom-6 right-6 z-50">
        <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-6 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <Wallet className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Invest Now</span>
        </Button>
      </Link>
    </div>
  );
};

export default HomeClient;