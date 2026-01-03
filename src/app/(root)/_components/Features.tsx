/* eslint-disable react/no-unescaped-entities */
// Features.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Shield, BarChart3, Users, PieChart, Eye, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const riskManagementPoints = [
    'Diversification across 7+ sectors',
    'Asset-backed investments',
    'Conservative capital deployment',
    'Continuous monitoring of projects',
    'Manual approval of all transactions',
    'Structured decision-making processes'
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-wg-neutral to-wg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
            Why <span className="text-wg-secondary">Water Grove</span> Stands Out
          </h2>
          <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
            We believe wealth creation should be structured, transparent, and backed by real economic activity.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-5 rounded-xl border border-wg-primary/10 hover:border-wg-accent/30 hover:bg-wg-accent/5 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-br from-wg-primary/10 to-wg-secondary/10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-wg-primary mb-2 text-lg">{feature.title}</h4>
                    <p className="text-wg-primary/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* <div className="mt-10">
              <Link href="/risk-management">
                <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Our Risk Management Strategy
                </Button>
              </Link>
            </div> */}
          </div>
          
          <div className="space-y-8">
            {/* Risk Management Card */}
            <div className="bg-gradient-to-br from-wg-primary to-wg-primary2 rounded-2xl p-8 border border-wg-accent/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-wg-secondary" />
                <h3 className="text-xl font-bold text-wg-neutral">Multi-Layered Risk Management</h3>
              </div>
              
              <div className="space-y-4">
                {riskManagementPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-wg-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-wg-neutral/90">{point}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-wg-neutral/20">
                <p className="text-wg-neutral/80 text-sm italic">
                  "While all investments carry risk, our strategy focuses on minimizing exposure and protecting investor capital."
                </p>
              </div>
            </div>
            
            {/* Returns Card */}
            <div className="bg-wg-neutral rounded-2xl p-8 border border-wg-primary/20 shadow-lg">
              <h3 className="text-xl font-bold text-wg-primary mb-6">How Returns Are Generated</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-wg-primary/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-wg-primary">Monthly</div>
                  <div className="text-sm text-wg-primary/70">ROI Payments</div>
                </div>
                <div className="bg-wg-secondary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-wg-primary">₦100k</div>
                  <div className="text-sm text-wg-primary/70">Minimum Start</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-wg-primary">Starter Groove</span>
                  <span className="font-semibold text-wg-primary">₦100k - ₦499k</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-wg-primary">Growth Groove</span>
                  <span className="font-semibold text-wg-primary">₦500k - ₦1M</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-wg-primary">Premium Groove</span>
                  <span className="font-semibold text-wg-primary">₦1M - ₦5M</span>
                </div>
              </div>
              
              <Link href="/investment-packages">
                <Button variant="outline" className="w-full mt-6 border-wg-primary text-wg-primary hover:bg-wg-primary hover:text-wg-neutral">
                  View All Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;