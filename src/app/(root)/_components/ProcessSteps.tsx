// ProcessSteps.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Wallet, Package, Zap, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProcessStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const stepIcons = [Users, Wallet, Package, Zap, TrendingUp, Download];

  return (
    <section className="py-20 bg-gradient-to-b from-wg-neutral to-wg-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-primary mb-4">
            How It <span className="text-wg-secondary">Works</span>
          </h2>
          <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
            Simple 6-step process to start earning monthly returns with Water Grove
          </p>
        </div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-6 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Step circle */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary2 text-wg-neutral flex flex-col items-center justify-center mb-6 shadow-lg border-4 border-wg-neutral group hover:scale-110 transition-transform duration-300">
                      <div className="text-xs font-medium text-wg-secondary mb-1">STEP</div>
                      <div className="text-2xl font-bold">{step.step}</div>
                    </div>
                    
                    {/* Step icon */}
                    <div className="w-16 h-16 rounded-full bg-wg-neutral border-4 border-wg-primary/20 flex items-center justify-center mb-4 shadow-lg group-hover:border-wg-accent transition-all duration-300">
                      <div className="text-wg-primary group-hover:text-wg-accent transition-colors duration-300">
                        {step.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-wg-primary mb-3">{step.title}</h3>
                    <p className="text-sm text-wg-primary/70 leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Step indicator dots */}
                  {index < 5 && (
                    <div className="absolute top-10 right-[-2.5rem] flex items-center">
                      <div className="w-3 h-3 rounded-full bg-wg-secondary animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-wg-accent animate-pulse ml-1" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-wg-secondary animate-pulse ml-1" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-wg-secondary via-wg-accent to-wg-secondary z-0"></div>
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step indicator */}
                  <div className="absolute left-0 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary2 text-wg-neutral flex items-center justify-center font-bold shadow-lg border-2 border-wg-neutral">
                    {step.step}
                  </div>
                  
                  <div className="ml-12">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-wg-primary/10">
                        <div className="text-wg-primary">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-wg-primary">{step.title}</h3>
                    </div>
                    <p className="text-wg-primary/70 leading-relaxed pl-16">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-wg-primary/10 to-wg-secondary/10 rounded-2xl p-8 border border-wg-primary/20 max-w-2xl mx-auto mb-8">
            <p className="text-wg-primary font-semibold mb-4">
              All payments and withdrawals are manually confirmed by our admin team for accuracy and transparency
            </p>
            <p className="text-sm text-wg-primary/60">
              Your investor category is automatically assigned based on your investment amount
            </p>
          </div>
          
          <Link href="/how-it-works">
            <Button className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral px-8 py-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group">
              View Detailed Process
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;