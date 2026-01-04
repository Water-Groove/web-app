/* eslint-disable react-hooks/purity */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Lock, 
  BarChart3, 
  Users,
  Clock,
  CheckCircle,
  Star,
  Trophy,
  Crown,
  Building,
  Leaf,
  Truck,
  Utensils,
  FileText,
  Building2,
  Fuel,
  Award,
  Calendar,
  Percent,
  Zap,
  Info,
  LineChart,
  Package,
  ChevronRight,
  Eye,
  Wallet,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const InvestmentSectorsClient = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  // Updated categories based on your specifications
  const categories = [
    {
      name: 'Starter Groove',
      range: '₦100K – ₦499K',
      description: 'Perfect for new investors starting their investment journey',
      icon: <Star className="h-10 w-10" />,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/20',
      features: [
        'Monthly ROI distributions',
        'Basic portfolio tracking',
        'Email support access',
        'Dashboard visibility'
      ],
      roi: 'Monthly',
      investmentTerm: 'Clearly defined terms',
      lockPeriod: 'Flexible options',
      badge: 'Entry Level',
      exactMin: 100000,
      exactMax: 499000,
      capitalLock: 'Structured capital deployment',
      gradient: 'from-blue-500/10 to-blue-600/10',
      projects: '50+ Active Projects'
    },
    {
      name: 'Growth Groove',
      range: '₦500K – ₦1M',
      description: 'Growth-focused investment with balanced returns',
      icon: <TrendingUp className="h-10 w-10" />,
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-green-500/20',
      features: [
        'Enhanced monthly returns',
        'Priority customer support',
        'Detailed analytics dashboard',
        'Sector diversification'
      ],
      roi: 'Monthly',
      investmentTerm: 'Professional management',
      lockPeriod: 'Structured terms',
      badge: 'Most Popular',
      exactMin: 500000,
      exactMax: 1000000,
      capitalLock: 'Asset-backed investments',
      gradient: 'from-green-500/10 to-green-600/10',
      projects: '35+ Active Projects'
    },
    {
      name: 'Premium Groove',
      range: '₦1M – ₦5M',
      description: 'Premium investment with enhanced returns and features',
      icon: <Trophy className="h-10 w-10" />,
      color: 'from-orange-500/20 to-amber-500/20',
      borderColor: 'border-purple-500/20',
      features: [
        'Premium monthly returns',
        'Personal account manager',
        'Advanced portfolio options',
        'Quarterly strategy reviews'
      ],
      roi: 'Monthly',
      investmentTerm: 'Transparent reporting',
      lockPeriod: 'Managed terms',
      badge: 'Premium',
      exactMin: 1000000,
      exactMax: 5000000,
      capitalLock: 'Conservative deployment',
      gradient: 'from-purple-500/10 to-purple-600/10',
      projects: '25+ Active Projects'
    },
    {
      name: 'Elite Investor',
      range: '₦5M – ₦10M',
      description: 'Institutional-grade investment category',
      icon: <Crown className="h-10 w-10" />,
      color: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'border-amber-500/20',
      features: [
        'Institutional monthly returns',
        'Dedicated relationship manager',
        'Custom investment strategies',
        'Exclusive opportunities access'
      ],
      roi: 'Monthly',
      investmentTerm: 'Continuous monitoring',
      lockPeriod: 'Expert management',
      badge: 'Elite',
      exactMin: 5000000,
      exactMax: 10000000,
      capitalLock: 'Risk-managed deployment',
      gradient: 'from-amber-500/10 to-amber-600/10',
      projects: '15+ Active Projects'
    },
    {
      name: 'Executive Groove',
      range: '₦10M+',
      description: 'High-net-worth investor exclusive category',
      icon: <Award className="h-10 w-10" />,
      color: 'from-purple-500/20 to-violet-500/20',
      borderColor: 'border-rose-500/20',
      features: [
        'Maximum monthly returns',
        'Private wealth management',
        'Direct project participation',
        'Tailored investment solutions'
      ],
      roi: 'Monthly',
      investmentTerm: 'Manual approval',
      lockPeriod: 'Strategic deployment',
      badge: 'Executive',
      exactMin: 10000000,
      exactMax: null,
      capitalLock: 'Professional oversight',
      gradient: 'from-rose-500/10 to-rose-600/10',
      projects: '10+ Active Projects'
    }
  ];

  const sectors = [
    {
      icon: <Building className="h-8 w-8" />,
      title: 'Real Estate',
      projects: '24 Active Projects',
      description: 'Strategic land acquisitions, residential developments, and property assets in high-growth areas',
      color: 'from-blue-500/20 to-cyan-500/20',
      projectsCount: '24'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Agriculture',
      projects: '18 Active Projects',
      description: 'Scalable agricultural projects including crop farming, processing, and distribution',
      color: 'from-emerald-500/20 to-green-500/20',
      projectsCount: '18'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Logistics',
      projects: '15 Active Projects',
      description: 'Transportation, distribution, and fulfillment services across various industries',
      color: 'from-orange-500/20 to-amber-500/20',
      projectsCount: '15'
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: 'Food & Events',
      projects: '22 Active Projects',
      description: 'Food production, catering, and event-related ventures with strong market demand',
      color: 'from-rose-500/20 to-pink-500/20',
      projectsCount: '22'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Structured Loans',
      projects: '35 Active Projects',
      description: 'Vetted loan products with defined repayment terms and controlled risk exposure',
      color: 'from-purple-500/20 to-violet-500/20',
      projectsCount: '35'
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Public Financing',
      projects: '12 Active Projects',
      description: 'Public and private sector project financing with predefined returns',
      color: 'from-sky-500/20 to-blue-500/20',
      projectsCount: '12'
    },
    {
      icon: <Fuel className="h-8 w-8" />,
      title: 'Oil & Gas',
      projects: '8 Active Projects',
      description: 'Downstream and service-based operations with clear revenue channels',
      color: 'from-yellow-500/20 to-amber-500/20',
      projectsCount: '8'
    }
  ];

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Asset-Backed',
      description: 'All investments backed by real economic activities'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Full Transparency',
      description: 'Manual confirmation of all transactions'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Monthly Returns',
      description: 'Structured monthly ROI system'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Professional Management',
      description: 'Experienced sector-specific expertise'
    }
  ];

  // Auto-rotate active category for demo effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setActiveCategory(prev => prev === null || prev >= categories.length - 1 ? 0 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [categories.length]);

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
              <Package className="mr-2 h-4 w-4" />
              INVESTMENT PACKAGES & SECTORS
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6 leading-tight">
              Invest Across
              <span className="block text-wg-secondary mt-2">7+ Sectors</span>
            </h1>
            
            <p className="text-lg md:text-xl text-wg-neutral/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Water Grove Investment Packages are structured based on investment volume and risk exposure. 
              Each package offers clearly defined investment terms and monthly ROI structure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#categories">
                <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  View Packages <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#sectors">
                <Button variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  Explore Sectors
                </Button>
              </Link>
            </div>

            {/* Minimum investment badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wg-primary border border-wg-accent">
              <Wallet className="h-4 w-4 text-wg-secondary" />
              <span className="text-sm text-wg-neutral">Minimum Investment: <span className="font-bold text-wg-secondary">₦100,000</span></span>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-wg-primary2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-3 md:p-4 rounded-lg bg-wg-primary/10 group-hover:bg-wg-accent/10 transition-colors duration-300 mb-3 md:mb-4">
                  <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-bold text-wg-primary text-sm md:text-base mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-wg-primary/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section id="categories" className="py-20 bg-gradient-to-b from-wg-neutral to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-primary mb-4">
              Investment <span className="text-wg-secondary">Categories</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Each package offers clearly defined investment terms and monthly ROI structure with dashboard visibility
            </p>
          </div>

          {/* Interactive Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-12">
            {categories.map((category, index) => (
              <Card 
                key={index}
                className={`relative overflow-hidden border-2 transition-all duration-500 group cursor-pointer
                  ${activeCategory === index ? 'border-wg-accent shadow-2xl scale-105' : 'border-wg-primary/10 hover:border-wg-accent/50'}
                  ${hoveredCategory === index ? 'transform -translate-y-2' : ''}
                `}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setActiveCategory(index)}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Active indicator */}
                {activeCategory === index && (
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping bg-wg-accent/40 rounded-full"></div>
                      <div className="relative w-3 h-3 rounded-full bg-wg-accent"></div>
                    </div>
                  </div>
                )}
                
                {/* Popular badge */}
                {category.badge === 'Most Popular' && (
                  <div className="absolute -top-3 -right-3">
                    <Badge className="bg-wg-secondary text-wg-primary font-bold px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} transition-all duration-500 group-hover:scale-110`}>
                      <div className={`transition-colors duration-500
                        ${activeCategory === index ? 'text-wg-accent' : 'text-wg-primary group-hover:text-wg-accent'}`}
                      >
                        {category.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <CardTitle className={`text-xl font-bold transition-colors duration-500
                      ${activeCategory === index ? 'text-wg-accent' : 'text-wg-primary'}`}
                    >
                      {category.name}
                    </CardTitle>
                    <div className="text-2xl font-bold text-wg-secondary mt-2">
                      {category.range}
                    </div>
                    <Badge variant="secondary" className="mt-2 bg-wg-secondary/20 text-wg-primary border-wg-secondary/30">
                      {category.projects}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-wg-primary/70 text-center mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-wg-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-wg-primary/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-wg-primary/10">
                    <div className="text-xs text-wg-primary/60">
                      {category.capitalLock}
                    </div>
                  </div>
                </CardContent>
                
                {/* Progress bar animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-wg-primary/10 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-wg-secondary to-wg-accent transition-all duration-1000
                    ${hoveredCategory === index ? 'w-full' : 'w-0'}`}
                  ></div>
                </div>
              </Card>
            ))}
          </div>

          {/* Package Comparison */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-wg-primary/10 via-wg-secondary/5 to-wg-accent/5 rounded-2xl p-8 border border-wg-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-xl bg-wg-primary/10">
                  <Target className="h-8 w-8 text-wg-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-wg-primary mb-2">
                    Package Comparison
                  </h3>
                  <p className="text-wg-primary/70">
                    All investment categories include: Clearly defined investment terms, Monthly ROI structure, 
                    Dedicated investment category, Dashboard visibility of earnings, and Transparent reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Sectors */}
      <section id="sectors" className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
              7+ Investment <span className="text-wg-secondary">Sectors</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Diversified opportunities across multiple sectors for consistent monthly returns
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {sectors.slice(0, 4).map((sector, index) => (
              <Card 
                key={index}
                className={`bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-xl group overflow-hidden
                  ${hoveredSector === index ? 'transform -translate-y-2' : ''}
                `}
                onMouseEnter={() => setHoveredSector(index)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-wg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${sector.color}`}>
                      <div className="text-wg-primary">{sector.icon}</div>
                    </div>
                    <Badge variant="secondary" className="bg-wg-secondary/20 text-wg-primary border-wg-secondary/30">
                      {sector.projectsCount}+
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-wg-primary">
                    {sector.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-wg-primary/70 leading-relaxed mb-6">
                    {sector.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/sectors/${sector.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-2 text-sm font-medium group/link"
                    >
                      <span className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                        View Opportunities
                      </span>
                      <ChevronRight className="h-4 w-4 text-wg-primary group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                    
                    <div className="text-xs text-wg-primary/50">
                      Active Projects
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Second Row for remaining sectors */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {sectors.slice(4).map((sector, index) => (
              <Card 
                key={index + 4}
                className="bg-gradient-to-br from-wg-primary/5 to-wg-neutral border border-wg-primary/20 hover:border-wg-accent/50 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${sector.color}`}>
                      <div className="text-wg-primary">{sector.icon}</div>
                    </div>
                    <CardTitle className="text-lg font-bold text-wg-primary">
                      {sector.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-wg-primary/70 mb-6">
                    {sector.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-wg-primary/30 text-wg-primary/70">
                      {sector.projectsCount} Active Projects
                    </Badge>
                    
                    <Link href={`/sectors/${sector.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 h-8 w-8 rounded-full bg-wg-primary/10 hover:bg-wg-accent/20"
                      >
                        <ArrowRight className="h-4 w-4 text-wg-primary" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/investment-sectors/detailed">
              <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group">
                Explore All Investment Sectors
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 rounded-2xl p-8 border border-wg-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-xl bg-wg-primary/10">
                  <Info className="h-8 w-8 text-wg-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-wg-primary mb-4">
                    Investment Risk Management
                  </h3>
                  <p className="text-wg-primary/70 mb-6 leading-relaxed">
                    Water Grove applies a multi-layered risk management approach including diversification across multiple sectors, 
                    asset-backed investments, conservative capital deployment, continuous monitoring of projects, and manual approval 
                    of all financial transactions. While all investments carry risk, our strategy focuses on minimizing exposure and 
                    protecting investor capital through structured decision-making.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
                      <Shield className="h-5 w-5 text-wg-accent" />
                      <span className="text-sm font-medium text-wg-primary">Multi-layered Risk Management</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-wg-primary/5">
                      <Lock className="h-5 w-5 text-wg-primary" />
                      <span className="text-sm font-medium text-wg-primary">Capital Protection Focus</span>
                    </div>
                  </div>
                </div>
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
              Ready to <span className="text-wg-secondary">Start Investing</span>?
            </h2>
            
            <div className="bg-wg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-wg-accent/20 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 mb-8 leading-relaxed">
                Join thousands of investors who trust Water Grove for structured, transparent, and asset-backed investment opportunities. 
                Start with just <span className="text-wg-secondary font-bold">₦100,000</span> and choose from 5 investment categories across 7+ sectors.
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
                    <LineChart className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">7+ Sectors</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Investing Today <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  Get Investment Advice
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

export default InvestmentSectorsClient;