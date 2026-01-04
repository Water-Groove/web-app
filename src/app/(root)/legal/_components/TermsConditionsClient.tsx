/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText,
  Shield,
  AlertTriangle,
  UserCheck,
  DollarSign,
  Lock,
  RefreshCw,
  Scale,
  ClipboardCheck,
  Ban,
  BookOpen,
  Gavel,
  Building,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const TermsConditionsClient = () => {
  const termsSections = [
    {
      title: '1. Introduction',
      icon: <BookOpen className="h-6 w-6" />,
      content: `Welcome to Water Grove Investment Platform ("Water Grove," "we," "our," or "us"). By accessing, registering, or using this website and its services, you agree to be legally bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.`,
      points: [
        'These terms constitute a legal agreement between you and Water Grove',
        'Continued use constitutes ongoing acceptance of updated terms',
        'Platform services are subject to availability and change'
      ]
    },
    {
      title: '2. Eligibility Criteria',
      icon: <UserCheck className="h-6 w-6" />,
      content: `To use this platform, you must meet the following requirements:`,
      points: [
        'Be at least 18 years of age',
        'Have legal capacity to enter binding agreements',
        'Provide accurate and truthful information during registration',
        'Not be prohibited from investing under applicable laws',
        'Comply with all anti-money laundering regulations'
      ],
      warning: 'Water Grove reserves the right to suspend or terminate accounts that provide false, misleading, or incomplete information.'
    },
    {
      title: '3. Nature of Services',
      icon: <Building className="h-6 w-6" />,
      content: `Water Grove provides a digital platform that enables users to participate in structured investment opportunities across various sectors. Important disclaimers:`,
      points: [
        'Water Grove is not a bank, financial institution, or licensed stockbroker',
        'Platform facilitates investments under defined terms and conditions',
        'We do not guarantee profits or investment returns',
        'All investments carry inherent risks',
        'Past performance does not indicate future results'
      ]
    },
    {
      title: '4. Investment Terms',
      icon: <TrendingUp className="h-6 w-6" />,
      content: `All investments on our platform are subject to specific conditions:`,
      points: [
        'Investments subject to specific timelines and expected returns',
        'ROI calculated based on agreed investment plans',
        'Performance may vary based on market conditions',
        'Capital locked for minimum 18 months period',
        'Early withdrawals may incur penalties where permitted'
      ]
    },
    {
      title: '5. Payments & Transactions',
      icon: <DollarSign className="h-6 w-6" />,
      content: `Financial transactions on the platform follow these procedures:`,
      points: [
        'All deposits reviewed and confirmed manually by administrators',
        'Wallet balances updated only after payment confirmation',
        'Withdrawal requests processed manually subject to approval',
        'Right to delay or reject suspicious transactions',
        'Minimum investment: ₦100,000'
      ]
    },
    {
      title: '6. User Responsibilities',
      icon: <Shield className="h-6 w-6" />,
      content: `By using our platform, you agree to:`,
      points: [
        'Use platform for lawful purposes only',
        'Maintain confidentiality of login credentials',
        'Notify Water Grove immediately of unauthorized access',
        'Accept full responsibility for investment decisions',
        'Comply with all applicable laws and regulations'
      ]
    }
  ];

  const riskFactors = [
    'Market volatility and economic conditions',
    'Business and operational risks',
    'Regulatory and legal changes',
    'Force majeure events',
    'Technology and cybersecurity risks',
    'Liquidity constraints'
  ];

  const terminationReasons = [
    'Violation of terms and conditions',
    'Fraudulent or suspicious activities',
    'Provision of false information',
    'Abuse of platform features',
    'Non-compliance with regulatory requirements',
    'Money laundering concerns'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <Gavel className="h-5 w-5 text-wg-secondary" />
              <Badge variant="outline" className="bg-wg-primary/20 border-wg-secondary/30 text-wg-neutral">
                Legal Agreement
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6">
              Terms & <span className="text-wg-secondary">Conditions</span>
            </h1>
            
            <div className="space-y-4 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 leading-relaxed">
                These Terms & Conditions govern your use of the <span className="text-wg-secondary font-semibold">Water Grove</span> Investment Platform. Please read them carefully before proceeding.
              </p>
              <div className="bg-wg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-wg-accent/20">
                <p className="text-wg-neutral font-medium">
                  "By registering or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms."
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#acceptance">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Acceptance of Terms <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/legal/privacy-policy">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  View Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-2 border-wg-secondary/30 bg-gradient-to-r from-wg-secondary/5 to-amber-500/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-wg-secondary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-wg-primary mb-2">Important Legal Notice</h3>
                    <p className="text-wg-primary/80">
                      This document contains important information about your rights and obligations. 
                      It also contains limitations and exclusions that may apply to you. Please read it carefully.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-12">
              {termsSections.map((section, index) => (
                <div key={index} id={`section-${index + 1}`}>
                  <Card className="border-wg-primary/10 hover:border-wg-accent/30 transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-wg-secondary to-wg-accent"></div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-wg-primary/10">
                          <div className="text-wg-primary">{section.icon}</div>
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-wg-primary">
                            {section.title}
                          </CardTitle>
                          {section.warning && (
                            <Badge variant="destructive" className="mt-2">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Important
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-wg-primary/80 leading-relaxed">
                        {section.content}
                      </p>
                      
                      <ul className="space-y-2">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-wg-accent flex-shrink-0 mt-0.5" />
                            <span className="text-wg-primary/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {section.warning && (
                        <div className="mt-4 p-4 rounded-lg bg-wg-secondary/10 border border-wg-secondary/20">
                          <div className="flex items-center gap-2 text-wg-primary font-medium">
                            <AlertCircle className="h-4 w-4" />
                            Note
                          </div>
                          <p className="text-wg-primary/70 text-sm mt-1">
                            {section.warning}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclaimer & Termination */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Risk Disclaimer */}
              <Card className="border-wg-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-wg-primary flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6" />
                    Risk Disclaimer
                  </CardTitle>
                  <CardDescription>
                    Understanding investment risks is crucial
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-wg-primary/80">
                    Investing involves risk, and all users must understand that the value of investments can fluctuate. Participation in any investment on the Water Grove platform carries the possibility of partial or total loss of capital.
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-wg-primary">Key Risk Factors:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {riskFactors.map((risk, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded bg-white/50">
                          <Ban className="h-4 w-4 text-wg-primary/60 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-wg-primary/80">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-wg-primary/10 border border-wg-primary/20">
                    <p className="text-wg-primary/70 text-sm italic">
                      "Past performance of any investment activity does not guarantee future results. Projected returns are estimates and should not be interpreted as assured outcomes."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Termination & Legal */}
              <div className="space-y-8">
                <Card className="border-wg-primary/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                      <Ban className="h-5 w-5" />
                      Account Termination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-wg-primary/80">
                        Water Grove reserves the right to suspend or terminate user accounts for the following reasons:
                      </p>
                      
                      <div className="space-y-2">
                        {terminationReasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 rounded bg-white/50">
                            <div className="w-2 h-2 rounded-full bg-wg-accent"></div>
                            <span className="text-sm text-wg-primary/80">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-wg-accent/20 bg-gradient-to-br from-wg-primary/5 to-wg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                      <Scale className="h-5 w-5" />
                      Legal Provisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-bold text-wg-primary mb-2">Governing Law</h4>
                      <p className="text-wg-primary/80 text-sm">
                        These Terms & Conditions shall be governed and interpreted in accordance with the laws of the Federal Republic of Nigeria.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-wg-primary mb-2">Platform Modifications</h4>
                      <p className="text-wg-primary/80 text-sm">
                        We reserve the right to modify, suspend, or discontinue any feature of the platform and update these terms at any time.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-wg-primary mb-2">Limitation of Liability</h4>
                      <p className="text-wg-primary/80 text-sm">
                        Water Grove shall not be liable for financial losses arising from market risks, technical disruptions, or user investment decisions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Advice & Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-wg-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-wg-primary">
                  Professional Advice & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-wg-primary/5 rounded-xl p-6">
                  <h4 className="font-bold text-wg-primary mb-3 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    Important Notice
                  </h4>
                  <p className="text-wg-primary/80">
                    Water Grove does not provide personalized financial, legal, or tax advice. Users are encouraged to seek independent professional advice and conduct thorough due diligence before making any investment decision.
                  </p>
                </div>
                
                <Separator className="bg-wg-primary/20" />
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg border border-wg-primary/10">
                    <FileText className="h-8 w-8 text-wg-accent mx-auto mb-3" />
                    <h5 className="font-bold text-wg-primary mb-2">Documentation</h5>
                    <p className="text-sm text-wg-primary/70">
                      Keep copies of all agreements and transaction records
                    </p>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg border border-wg-primary/10">
                    <RefreshCw className="h-8 w-8 text-wg-accent mx-auto mb-3" />
                    <h5 className="font-bold text-wg-primary mb-2">Updates</h5>
                    <p className="text-sm text-wg-primary/70">
                      Review terms periodically for updates and changes
                    </p>
                  </div>
                  
                  <div className="text-center p-4 rounded-lg border border-wg-primary/10">
                    <Users className="h-8 w-8 text-wg-accent mx-auto mb-3" />
                    <h5 className="font-bold text-wg-primary mb-2">Support</h5>
                    <p className="text-sm text-wg-primary/70">
                      Contact us for clarification on any terms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Acceptance Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-primary2" id="acceptance">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-neutral mb-6">
              Acceptance of Terms & Conditions
            </h2>
            
            <div className="bg-wg-neutral/10 backdrop-blur-sm rounded-2xl p-8 border border-wg-neutral/20 mb-10">
              <p className="text-lg text-wg-neutral/90 mb-6">
                By registering, accessing, or using the Water Grove Investment Platform, you expressly confirm that:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  'You have read and understood the Terms & Conditions',
                  'You acknowledge the Risk Disclaimer',
                  'You agree to the Privacy Policy',
                  'You understand investment risks involved',
                  'You accept responsibility for decisions',
                  'You meet all eligibility criteria'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-wg-neutral/5">
                    <CheckCircle className="h-5 w-5 text-wg-secondary" />
                    <span className="text-wg-neutral/90">{item}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-wg-neutral/80 italic">
                Your continued use of the platform constitutes ongoing acceptance of these terms.
              </p>
            </div>
            
           
            
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsClient;