/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Eye,
  Lock,
  BarChart3,
  Award,
  CheckCircle,
  ArrowRight,
  PieChart,
  FileText,
  Building,
  Leaf,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutClient = () => {
  const coreValues = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Transparency',
      description: 'Manual confirmation of all deposits and withdrawals with full transaction history',
      color: 'from-wg-primary/10 to-wg-accent/10'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Asset-Backed Security',
      description: 'All investments backed by real economic activities and tangible assets',
      color: 'from-wg-secondary/10 to-amber-500/10'
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: 'Diversified Portfolio',
      description: 'Spread investments across 7+ sectors to minimize risk exposure',
      color: 'from-wg-primary/20 to-wg-primary2/10'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Consistent Returns',
      description: 'Structured monthly ROI system with transparent reporting',
      color: 'from-wg-accent/10 to-blue-500/10'
    }
  ];

  const investmentSectors = [
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Real Estate',
      projects: '24'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: 'Agriculture',
      projects: '18'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Logistics',
      projects: '15'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Structured Loans',
      projects: '35'
    }
  ];

  const safetyMeasures = [
    'Manual approval of all financial transactions',
    'Continuous monitoring of investment projects',
    'Conservative capital deployment strategy',
    'Structured decision-making processes',
    'Clear communication with investors',
    'Secure access to personal accounts'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6">
              Invest With
              <span className="block text-wg-secondary mt-2">Confidence</span>
            </h1>
            
            <div className="space-y-4 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 leading-relaxed">
                At <span className="text-wg-secondary font-semibold">Water Grove</span>, we believe wealth creation should be structured, transparent, and backed by real economic activity.
              </p>
              <p className="text-lg text-wg-neutral/80 leading-relaxed">
                Our investment platform allows individuals and organizations to invest in diversified sectors that drive growth, while earning steady returns through professionally managed ventures.
              </p>
              <div className="bg-wg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-wg-accent/20">
                <p className="text-wg-neutral font-medium">
                  "Whether you are starting with <span className="text-wg-secondary font-bold">₦100,000</span> or investing at a larger scale, Water Grove offers a clear pathway to grow your capital responsibly."
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/investment-sectors">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  View Investment Sectors <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-primary mb-4">
              Our <span className="text-wg-secondary">Core Principles</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              The foundation of every investment decision we make at Water Grove
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <Card 
                key={index} 
                className="bg-gradient-to-b from-wg-neutral to-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 group hover:shadow-xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-wg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                      {value.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-wg-primary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-wg-primary/70">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Sectors Overview */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-6">
                Diversified <span className="text-wg-secondary">Investment</span> Portfolio
              </h2>
              <p className="text-lg text-wg-primary/70 mb-8 leading-relaxed">
                Water Grove invests in carefully structured opportunities across multiple sectors, 
                each selected for its growth potential and ability to generate consistent returns.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {investmentSectors.map((sector, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-wg-primary/10 hover:border-wg-accent/30 transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-wg-primary/10">
                      <div className="text-wg-primary">{sector.icon}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-wg-primary">{sector.title}</div>
                      <div className="text-sm text-wg-primary/60">{sector.projects} Active Projects</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/investment-sectors">
                <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Explore All 7 Sectors
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-wg-primary to-wg-primary2 rounded-2xl p-8 border border-wg-accent/20 shadow-xl">
              <h3 className="text-2xl font-bold text-wg-neutral mb-6">
                How Returns Are Generated
              </h3>
              
              <div className="space-y-4 mb-8">
                {[
                  'Asset acquisition and resale',
                  'Rental and lease income',
                  'Business operational profits',
                  'Loan interest and structured repayments',
                  'Service-based revenues'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-wg-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-wg-neutral/90">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-wg-neutral/20">
                <p className="text-wg-neutral/80 text-sm italic">
                  "Each investment channel is monitored to ensure performance aligns with projected returns."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Transparency Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-primary mb-4">
              Safety & <span className="text-wg-secondary">Transparency</span>
            </h2>
            <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
              Our multi-layered approach to protecting your investment capital
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-wg-neutral to-white rounded-2xl p-8 border border-wg-primary/10 shadow-lg">
                <h3 className="text-2xl font-bold text-wg-primary mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-wg-accent" />
                  Risk Management Strategy
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Diversification across multiple sectors',
                    'Asset-backed investments',
                    'Conservative capital deployment',
                    'Continuous monitoring of projects'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-wg-secondary mt-2"></div>
                      <span className="text-wg-primary/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 rounded-2xl p-8 border border-wg-primary/20">
                <h3 className="text-xl font-bold text-wg-primary mb-4">Investment Categories</h3>
                <div className="space-y-3">
                  {[
                    'Starter Groove (₦100,000 – ₦499,000)',
                    'Growth Groove (₦500,000 – ₦1,000,000)',
                    'Premium Groove (₦1,000,000 – ₦5,000,000)',
                    'Elite Investor (₦5,000,000 – ₦10,000,000)',
                    'Executive Groove (₦10,000,000 and above)'
                  ].map((category, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                      <span className="text-wg-primary font-medium">{category.split('(')[0]}</span>
                      <Badge variant="secondary" className="bg-wg-secondary/20 text-wg-primary">
                        {category.match(/₦[\d,]+/g)?.join(' - ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-wg-primary to-wg-primary2 rounded-2xl p-8 border border-wg-accent/20 shadow-xl">
                  <h3 className="text-2xl font-bold text-wg-neutral mb-6">
                    Transparency Measures
                  </h3>
                  
                  <div className="space-y-4">
                    {safetyMeasures.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-wg-neutral/5">
                        <div className="p-2 rounded-lg bg-wg-accent/20">
                          <CheckCircle className="h-4 w-4 text-wg-accent" />
                        </div>
                        <span className="text-wg-neutral/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-wg-neutral/20">
                    <p className="text-wg-neutral/80 text-sm italic mb-4">
                      "Transparency is a core principle at Water Grove."
                    </p>
                    <div className="text-center">
                      <Badge className="bg-wg-secondary/20 text-wg-primary hover:bg-wg-secondary/30">
                        Manual Confirmation on All Transactions
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-white rounded-2xl p-6 border border-wg-primary/10 shadow-lg">
                  <h4 className="text-lg font-bold text-wg-primary mb-4">Company Track Record</h4>
                  <p className="text-wg-primary/70 mb-4">
                    Water Grove is built on experienced management, sector knowledge, and a commitment to responsible investing.
                  </p>
                  <p className="text-sm text-wg-primary/60">
                    Our operations focus on real economic activities that create value while generating returns for investors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-primary2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-neutral mb-6">
              Ready to Grow With Purpose?
            </h2>
            <p className="text-xl text-wg-neutral/90 mb-10 max-w-2xl mx-auto">
              Join investors who trust Water Grove's structured, transparent approach to wealth creation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Investing Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  Contact Our Team
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-wg-secondary mb-2">7+</div>
                <div className="text-sm text-wg-neutral/80">Investment Sectors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-wg-secondary mb-2">₦100k</div>
                <div className="text-sm text-wg-neutral/80">Minimum Start</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-wg-secondary mb-2">Monthly</div>
                <div className="text-sm text-wg-neutral/80">ROI Structure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-wg-secondary mb-2">100%</div>
                <div className="text-sm text-wg-neutral/80">Transparent</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;