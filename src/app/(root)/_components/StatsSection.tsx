// StatsSection.tsx
'use client';

import React from 'react';
import { TrendingUp, Users, CheckCircle, Shield } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-wg-primary via-wg-primary2 to-wg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-wg-secondary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-wg-neutral/80 tracking-wide font-medium">{stat.label}</div>
              
              {/* Animated underline */}
              <div className="mt-4 w-12 h-0.5 bg-wg-accent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-wg-accent/20">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-wg-neutral/90">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-wg-secondary" />
              <span>Asset-Backed Investments</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-wg-neutral/40"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-wg-secondary" />
              <span>Monthly ROI Structure</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-wg-neutral/40"></div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-wg-secondary" />
              <span>Professional Management</span>
            </div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-wg-neutral/40"></div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-wg-secondary" />
              <span>Transparent Operations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;