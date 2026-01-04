/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  AlertTriangle,
  Shield,
  DollarSign,
  TrendingDown,
  FileText,
  Scale,
  Lock,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Clock,
  Users,
  Mail,
  Phone,
  ArrowRight,
  Globe,
  Target,
  PieChart,
  Building,
  Leaf,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const InvestmentDisclaimerClient = () => {
  const riskCategories = [
    {
      title: 'Market & Economic Risks',
      icon: <TrendingDown className="h-6 w-6" />,
      risks: [
        'Market volatility affecting asset values',
        'Economic recession or downturn impacts',
        'Inflation and currency devaluation',
        'Interest rate fluctuations',
        'Global economic uncertainties'
      ],
      severity: 'High',
      color: 'from-red-500/10 to-orange-500/10'
    },
    {
      title: 'Operational & Business Risks',
      icon: <Building className="h-6 w-6" />,
      risks: [
        'Business model execution challenges',
        'Management and operational inefficiencies',
        'Project delays and cost overruns',
        'Competitive market pressures',
        'Supply chain disruptions'
      ],
      severity: 'Medium',
      color: 'from-amber-500/10 to-yellow-500/10'
    },
    {
      title: 'Regulatory & Legal Risks',
      icon: <Scale className="h-6 w-6" />,
      risks: [
        'Changes in government regulations',
        'Tax law modifications',
        'Legal disputes and litigation',
        'Compliance requirements changes',
        'Licensing and permit issues'
      ],
      severity: 'Medium',
      color: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      title: 'Technology & Security Risks',
      icon: <Shield className="h-6 w-6" />,
      risks: [
        'Cybersecurity threats and data breaches',
        'Technology infrastructure failures',
        'Platform downtime and technical issues',
        'Digital payment system vulnerabilities',
        'Data loss or corruption'
      ],
      severity: 'Medium',
      color: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  const investmentSectorsRisk = [
    {
      sector: 'Real Estate',
      riskLevel: 'Medium',
      volatility: 'Low to Medium',
      liquidity: 'Low',
      icon: <Building className="h-5 w-5" />
    },
    {
      sector: 'Agriculture',
      riskLevel: 'Medium',
      volatility: 'Medium',
      liquidity: 'Medium',
      icon: <Leaf className="h-5 w-5" />
    },
    {
      sector: 'Logistics',
      riskLevel: 'Medium',
      volatility: 'Medium',
      liquidity: 'Medium',
      icon: <Truck className="h-5 w-5" />
    },
    {
      sector: 'Structured Loans',
      riskLevel: 'High',
      volatility: 'High',
      liquidity: 'Low',
      icon: <FileText className="h-5 w-5" />
    },
    {
      sector: 'Oil & Gas',
      riskLevel: 'High',
      volatility: 'High',
      liquidity: 'Medium',
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  const warnings = [
    'Capital is at risk - you may lose some or all of your investment',
    'Past performance is not indicative of future results',
    'Projected returns are estimates, not guarantees',
    'Investments are not insured or guaranteed by any government agency',
    'Withdrawal of capital is subject to 18-month lock-in period',
    'Returns may be affected by factors beyond our control'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section with Strong Warning */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-wg-primary2 to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-wg-secondary to-amber-500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse" />
              <Badge variant="outline" className="bg-red-500/20 border-red-400/50 text-red-100">
                IMPORTANT DISCLAIMER
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6">
              Investment <span className="text-red-300">Risk</span> Disclaimer
            </h1>
            
            <div className="space-y-4 mb-10">
              <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-400/30">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-bold text-red-100 mb-2">CRITICAL WARNING</h3>
                    <p className="text-red-100/90">
                      Investing involves substantial risk of loss. You should NOT invest money that you cannot afford to lose. 
                      Water Grove does NOT guarantee any returns, and your capital is NOT protected against loss.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-wg-neutral/90 leading-relaxed">
                This disclaimer outlines the significant risks associated with investing through the 
                <span className="text-wg-secondary font-semibold"> Water Grove</span> platform. 
                By proceeding with any investment, you acknowledge and accept these risks in their entirety.
              </p>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Key Warning Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-red-500/30 bg-gradient-to-r from-red-500/10 to-amber-500/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="text-lg font-bold text-wg-primary">NO GUARANTEES</h3>
                      <p className="text-wg-primary/80 text-sm">
                        Water Grove does not guarantee profits or protect against losses
                      </p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-sm px-4 py-2">
                    HIGH-RISK INVESTMENT
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Disclaimer Content */}
      <section className="py-20" id="risk-understanding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
                Understanding <span className="text-red-500">Investment Risks</span>
              </h2>
              <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
                All investments carry risk. Below are the specific risk categories applicable to Water Grove investments:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {riskCategories.map((category, index) => (
                <Card key={index} className={`border-wg-primary/10 overflow-hidden ${category.color}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/20">
                          <div className="text-wg-primary">{category.icon}</div>
                        </div>
                        <CardTitle className="text-xl font-bold text-wg-primary">
                          {category.title}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant={category.severity === 'High' ? 'destructive' : 'secondary'}
                        className="bg-opacity-20"
                      >
                        {category.severity} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.risks.map((risk, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-wg-primary/80 text-sm">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Warnings */}
            <Card className="border-2 border-amber-500/30 mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-wg-primary flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                  Additional Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {warnings.map((warning, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-wg-primary/90">{warning}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector-Specific Risk Analysis */}
            <div className="bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-wg-primary mb-6 text-center">
                Sector-Specific Risk Analysis
              </h3>
              
              <div className="overflow-hidden rounded-lg border border-wg-primary/20">
                <table className="w-full">
                  <thead className="bg-wg-primary/10">
                    <tr>
                      <th className="text-left p-4 text-sm font-semibold text-wg-primary">Investment Sector</th>
                      <th className="text-left p-4 text-sm font-semibold text-wg-primary">Risk Level</th>
                      <th className="text-left p-4 text-sm font-semibold text-wg-primary">Volatility</th>
                      <th className="text-left p-4 text-sm font-semibold text-wg-primary">Liquidity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentSectorsRisk.map((sector, idx) => (
                      <tr key={idx} className="border-t border-wg-primary/10 even:bg-white/50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="text-wg-primary">{sector.icon}</div>
                            <span className="font-medium text-wg-primary">{sector.sector}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={sector.riskLevel === 'High' ? 'destructive' : 'secondary'}
                            className="bg-opacity-20"
                          >
                            {sector.riskLevel}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-full h-2 rounded-full ${
                              sector.volatility === 'High' ? 'bg-red-500' :
                              sector.volatility === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm text-wg-primary/80">{sector.volatility}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-full h-2 rounded-full ${
                              sector.liquidity === 'Low' ? 'bg-red-500' :
                              sector.liquidity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm text-wg-primary/80">{sector.liquidity}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-wg-primary/60">
                  Risk levels are subject to change based on market conditions and project-specific factors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management & Mitigation */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-primary2">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-wg-neutral mb-6">
                  Our Risk <span className="text-wg-secondary">Management</span> Approach
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      title: 'Diversification Strategy',
                      description: 'Spread investments across 7+ sectors to minimize exposure to any single risk',
                      icon: <PieChart className="h-5 w-5" />
                    },
                    {
                      title: 'Asset-Backed Investments',
                      description: 'All investments are backed by tangible assets and real economic activities',
                      icon: <Shield className="h-5 w-5" />
                    },
                    {
                      title: 'Conservative Deployment',
                      description: 'Cautious capital allocation with rigorous due diligence processes',
                      icon: <Target className="h-5 w-5" />
                    },
                    {
                      title: 'Continuous Monitoring',
                      description: 'Ongoing assessment of all investment projects and market conditions',
                      icon: <Clock className="h-5 w-5" />
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-wg-neutral/5">
                      <div className="p-2 rounded-lg bg-wg-secondary/20">
                        <div className="text-wg-neutral">{item.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-wg-neutral mb-1">{item.title}</h4>
                        <p className="text-wg-neutral/80 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-wg-neutral/5 backdrop-blur-sm rounded-2xl p-8 border border-wg-neutral/20">
                <h3 className="text-2xl font-bold text-wg-neutral mb-6">
                  Your Responsibility
                </h3>
                
                <div className="space-y-4 mb-8">
                  <p className="text-wg-neutral/90">
                    As an investor, you are responsible for:
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      'Conducting your own due diligence',
                      'Understanding all risks involved',
                      'Investing only what you can afford to lose',
                      'Seeking independent financial advice',
                      'Monitoring your investments regularly',
                      'Making informed investment decisions'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-wg-secondary" />
                        <span className="text-wg-neutral/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-400/30">
                  <p className="text-red-100 text-sm italic">
                    "While we implement risk management strategies, these do NOT eliminate investment risk. 
                    You should NOT invest if you are unwilling or unable to accept potential losses."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Acceptance & Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-red-500/30 bg-gradient-to-b from-white to-red-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-wg-primary">
                  Final Acknowledgement & Contact
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <h4 className="text-lg font-bold text-red-600">IMPORTANT DECLARATION</h4>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <p className="text-wg-primary font-medium mb-4">
                      By proceeding to invest with Water Grove, I acknowledge that:
                    </p>
                    
                    <div className="space-y-3 text-left">
                      {[
                        'I have read and understood this Investment Risk Disclaimer',
                        'I am aware that I may lose some or all of my investment',
                        'I accept full responsibility for my investment decisions',
                        'I have sought independent advice if needed',
                        'I am investing money I can afford to lose',
                        'I understand the 18-month capital lock-in period'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-wg-primary/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-wg-primary/20" />
                
                <div className="text-center">
                  <h4 className="text-lg font-bold text-wg-primary mb-6">Need Clarification?</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 rounded-lg border border-wg-primary/10">
                      <Mail className="h-8 w-8 text-wg-accent mx-auto mb-3" />
                      <h5 className="font-bold text-wg-primary mb-2">Email Support</h5>
                      <a 
                        href="mailto:support@watergrooveinvestment.com" 
                        className="text-wg-accent hover:underline block"
                      >
                        support@watergrooveinvestment.com
                      </a>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg border border-wg-primary/10">
                      <Phone className="h-8 w-8 text-wg-accent mx-auto mb-3" />
                      <h5 className="font-bold text-wg-primary mb-2">Phone Support</h5>
                      <a 
                        href="tel:+2348035026480" 
                        className="text-wg-accent hover:underline block"
                      >
                        +234 803 502 6480
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-sm text-wg-primary/60 mb-6">
                    Contact us for any questions about investment risks before proceeding
                  </p>
                  
                  
                </div>
              </CardContent>
            </Card>
            
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentDisclaimerClient;