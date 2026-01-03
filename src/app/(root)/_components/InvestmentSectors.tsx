/* eslint-disable react-hooks/purity */
// InvestmentSectors.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Sector {
  icon: React.ReactNode;
  title: string;
  description: string;
  projects: number;
  color?: string;
}

interface InvestmentSectorsProps {
  sectors: Sector[];
}

const InvestmentSectors: React.FC<InvestmentSectorsProps> = ({ sectors }) => {
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);
  const [activeSector, setActiveSector] = useState<number | null>(null);
  
  // Only display first 3 sectors
  const displaySectors = sectors.slice(0, 3);
  
  const sectorColors = [
    'from-blue-500/20 to-cyan-500/20',
    'from-emerald-500/20 to-green-500/20',
    'from-orange-500/20 to-amber-500/20',
  ];

  // Auto-rotate active sector for demo effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setActiveSector(prev => prev === null || prev >= displaySectors.length - 1 ? 0 : prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [displaySectors.length]);

  const handleSectorClick = (index: number) => {
    setActiveSector(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-wg-primary/5 via-transparent to-wg-secondary/5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wg-accent/30 to-transparent"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-wg-accent/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-wg-secondary/20 text-wg-primary hover:bg-wg-secondary/30 border-wg-secondary/30">
            Featured Investment Sectors
          </Badge>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-primary mb-6 leading-tight">
            Diversified Investment
            <span className="block text-wg-secondary mt-2">Portfolio</span>
          </h2>
          
          <p className="text-lg md:text-xl text-wg-primary/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Water Grove Investment Platform provides access to carefully structured, asset-backed 
            investment opportunities across multiple sectors — designed to deliver consistent 
            monthly returns with transparency and control.
          </p>
          
          <div className="inline-flex items-center gap-4 text-sm text-wg-primary/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-wg-secondary animate-pulse"></div>
              <span>Monthly ROI Structure</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-wg-primary/40"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-wg-accent animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <span>Asset-Backed Projects</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-wg-primary/40"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-wg-secondary animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <span>Professional Management</span>
            </div>
          </div>
        </div>

        {/* Interactive Sector Grid - Only 3 sectors */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {displaySectors.map((sector, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden border-2 transition-all duration-500 group cursor-pointer h-full
                ${activeSector === index ? 'border-wg-accent shadow-2xl scale-105' : 'border-wg-primary/10 hover:border-wg-accent/50'}
                ${hoveredSector === index ? 'transform -translate-y-2' : ''}
              `}
              onMouseEnter={() => setHoveredSector(index)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => handleSectorClick(index)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sectorColors[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Active indicator */}
              {activeSector === index && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping bg-wg-accent/40 rounded-full"></div>
                    <div className="relative w-3 h-3 rounded-full bg-wg-accent"></div>
                  </div>
                </div>
              )}
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-4 rounded-2xl transition-all duration-500 group-hover:scale-110
                    ${activeSector === index ? 'bg-wg-accent/20' : 'bg-wg-primary/10'}`}
                  >
                    <div className={`transition-colors duration-500
                      ${activeSector === index ? 'text-wg-accent' : 'text-wg-primary group-hover:text-wg-accent'}`}
                    >
                      {sector.icon}
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="bg-wg-secondary/20 text-wg-primary border-wg-secondary/30">
                    {sector.projects}+
                  </Badge>
                </div>
                
                <CardTitle className={`text-xl font-bold transition-colors duration-500
                  ${activeSector === index ? 'text-wg-accent' : 'text-wg-primary'}`}
                >
                  {sector.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative">
                <CardDescription className="text-wg-primary/70 leading-relaxed mb-6 text-sm">
                  {sector.description}
                </CardDescription>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/sectors/${sector.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-2 text-sm font-medium group/link"
                  >
                    <span className={`transition-colors duration-300
                      ${activeSector === index ? 'text-wg-accent' : 'text-wg-primary group-hover:text-wg-accent'}`}
                    >
                      View Opportunities
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1
                      ${activeSector === index ? 'text-wg-accent' : 'text-wg-primary'}`}
                    />
                  </Link>
                  
                  <div className="text-xs text-wg-primary/50">
                    Active Projects
                  </div>
                </div>
              </CardContent>
              
              {/* Progress bar animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-wg-primary/10 overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-wg-secondary to-wg-accent transition-all duration-1000
                  ${hoveredSector === index ? 'w-full' : 'w-0'}`}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Sectors CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-wg-primary/10 via-wg-secondary/5 to-wg-accent/5 rounded-2xl p-8 border border-wg-primary/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-wg-primary mb-2">
                  Explore All 7 Investment Sectors
                </h3>
                <p className="text-wg-primary/70 mb-4">
                  Discover more opportunities across additional sectors including:
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectors.slice(3).map((sector, idx) => (
                    <Badge key={idx} variant="outline" className="border-wg-primary/30 text-wg-primary/80">
                      {sector.title}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Link href="/investment-sectors">
                <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group min-w-[200px]">
                  <Eye className="mr-2 h-5 w-5" />
                  View All Sectors
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sector Visualization */}
        <div className="bg-gradient-to-r from-wg-primary/10 via-wg-secondary/5 to-wg-primary/10 rounded-2xl p-8 border border-wg-primary/20 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-wg-primary mb-4">
                How Returns Are Generated Across Sectors
              </h3>
              <p className="text-wg-primary/70 mb-6">
                Each investment channel is monitored to ensure performance aligns with projected returns through:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Asset Acquisition & Resale', 'Rental & Lease Income', 'Operational Profits', 
                  'Loan Interest', 'Service Revenues', 'Capital Appreciation'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-wg-secondary"></div>
                    <span className="text-sm text-wg-primary/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="bg-wg-primary rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-wg-neutral mb-2">{sectors.length}+</div>
                <div className="text-wg-neutral/90 font-medium">Investment Sectors</div>
                <div className="text-wg-neutral/70 text-sm mt-2">Diversified Portfolio</div>
                
                <div className="mt-6 pt-6 border-t border-wg-neutral/20">
                  <div className="text-wg-neutral text-sm">Risk Minimized Through</div>
                  <div className="text-wg-secondary font-bold mt-1">Sector Diversification</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-r from-wg-primary to-wg-primary2 rounded-2xl p-8 shadow-xl mb-8 max-w-3xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-wg-neutral mb-2">
                Ready to Diversify Your Portfolio?
              </h3>
              <p className="text-wg-neutral/80">
                Start with just ₦100,000 and gain access to all {sectors.length} investment sectors
              </p>
            </div>
            
            <Link href="/register">
              <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                Begin Investing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
          
          <p className="text-wg-primary/60 text-sm max-w-2xl mx-auto">
            All sectors are professionally managed with transparent reporting and manual confirmation of all transactions.
          </p>
        </div>
      </div>

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
    </section>
  );
};

export default InvestmentSectors;