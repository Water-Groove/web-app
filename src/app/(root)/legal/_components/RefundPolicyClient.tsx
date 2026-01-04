/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  DollarSign,
  Clock,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Lock,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  RefreshCw,
  BookOpen,
  BarChart3,
  Percent,
  Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const RefundPolicyClient = () => {
  const withdrawalStages = [
    {
      stage: 1,
      title: 'Request Submission',
      description: 'Submit withdrawal request via dashboard',
      time: 'Instant',
      status: 'User Action',
      icon: <FileText className="h-5 w-5" />
    },
    {
      stage: 2,
      title: 'Admin Review',
      description: 'Manual verification by admin team',
      time: '24-48 Hours',
      status: 'Pending Approval',
      icon: <Users className="h-5 w-5" />
    },
    {
      stage: 3,
      title: 'Approval & Processing',
      description: 'Request approved and queued for payment',
      time: '24-48 Hours',
      status: 'Processing',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      stage: 4,
      title: 'Payment Execution',
      description: 'Funds transferred to your bank account',
      time: '24-48 Hours',
      status: 'Completed',
      icon: <CreditCard className="h-5 w-5" />
    }
  ];

  const withdrawalLimits = [
    {
      category: 'Starter Groove',
      minWithdrawal: '₦10,000',
      maxWithdrawal: '₦200,000',
      processingFee: '₦500',
      frequency: 'Monthly'
    },
    {
      category: 'Growth Groove',
      minWithdrawal: '₦25,000',
      maxWithdrawal: '₦500,000',
      processingFee: '₦1,000',
      frequency: 'Monthly'
    },
    {
      category: 'Premium Groove',
      minWithdrawal: '₦50,000',
      maxWithdrawal: '₦1,000,000',
      processingFee: '₦2,000',
      frequency: 'Monthly'
    },
    {
      category: 'Elite Investor',
      minWithdrawal: '₦100,000',
      maxWithdrawal: '₦2,000,000',
      processingFee: '₦5,000',
      frequency: 'Monthly'
    },
    {
      category: 'Executive Groove',
      minWithdrawal: '₦250,000',
      maxWithdrawal: '₦5,000,000',
      processingFee: '₦10,000',
      frequency: 'Monthly'
    }
  ];

  const nonRefundableScenarios = [
    'Investment capital during lock-in period (18 months)',
    'Processing fees for withdrawals and transactions',
    'Returns on unsuccessful investment ventures',
    'Funds invested in active projects',
    'Administrative and management fees',
    'Funds affected by market losses'
  ];

  const specialConditions = [
    {
      condition: '18-Month Capital Lock',
      description: 'Investment capital cannot be withdrawn for first 18 months',
      icon: <Lock className="h-5 w-5" />,
      severity: 'high'
    },
    {
      condition: 'ROI-Only Withdrawals',
      description: 'Only earned returns can be withdrawn during lock period',
      icon: <TrendingUp className="h-5 w-5" />,
      severity: 'medium'
    },
    {
      condition: 'Manual Processing',
      description: 'All withdrawals require admin approval (24-48 hours)',
      icon: <Users className="h-5 w-5" />,
      severity: 'medium'
    },
    {
      condition: 'Business Days',
      description: 'Processing occurs Monday-Friday, excluding holidays',
      icon: <Calendar className="h-5 w-5" />,
      severity: 'low'
    }
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
              <CreditCard className="h-5 w-5 text-wg-secondary" />
              <Badge variant="outline" className="bg-wg-primary/20 border-wg-secondary/30 text-wg-neutral">
                Financial Policies
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6">
              Refund & <span className="text-wg-secondary">Withdrawal</span> Policy
            </h1>
            
            <div className="space-y-4 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 leading-relaxed">
                At <span className="text-wg-secondary font-semibold">Water Grove</span>, we maintain transparent and structured financial policies for withdrawals and refunds. 
                This document outlines our procedures, timelines, and important conditions.
              </p>
              <div className="bg-wg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-wg-accent/20">
                <p className="text-wg-neutral font-medium">
                  "All withdrawals are processed manually by our admin team to ensure accuracy, security, and compliance."
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#withdrawal-process">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Withdrawal Process <ArrowRight className="ml-2 h-5 w-5" />
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
                  <AlertCircle className="h-8 w-8 text-wg-secondary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-wg-primary mb-2">Important Policy Notice</h3>
                    <p className="text-wg-primary/80">
                      Please read this policy carefully. By investing with Water Grove, you agree to these withdrawal 
                      and refund terms. Capital is locked for 18 months from investment date.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Withdrawal Process Timeline */}
      <section className="py-20" id="withdrawal-process">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
                Withdrawal <span className="text-wg-secondary">Process</span> Timeline
              </h2>
              <p className="text-lg text-wg-primary/70 max-w-3xl mx-auto">
                All withdrawals follow a structured 4-stage process with manual verification at each step
              </p>
            </div>
            
            {/* Process Timeline */}
            <div className="relative mb-12">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-wg-primary via-wg-accent to-wg-primary transform -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {withdrawalStages.map((stage) => (
                  <div key={stage.stage} className="relative">
                    <Card className="border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-wg-primary to-wg-primary2 mb-4">
                          <span className="text-xl font-bold text-wg-neutral">{stage.stage}</span>
                        </div>
                        <CardTitle className="text-lg font-bold text-wg-primary">
                          {stage.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {stage.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-wg-accent" />
                          <span className="text-sm font-medium text-wg-primary">{stage.time}</span>
                        </div>
                        <Badge variant="outline" className="bg-wg-primary/5">
                          {stage.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Processing Time */}
            <Card className="bg-gradient-to-r from-wg-primary/5 to-wg-accent/5 border-wg-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-wg-primary mb-2">Total Processing Time</h3>
                    <p className="text-wg-primary/70">
                      From request submission to funds in your account
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-wg-secondary mb-2">24-48 Hours</div>
                    <div className="text-sm text-wg-primary/60">Business Hours</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-wg-accent" />
                    <span className="text-sm text-wg-primary/70">Manual Processing Required</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Withdrawal Limits & Fees */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
                Withdrawal <span className="text-wg-secondary">Limits</span> & Fees
              </h2>
              <p className="text-lg text-wg-primary/70 max-w-2xl mx-auto">
                Limits and processing fees vary by investor category
              </p>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-wg-primary/20 shadow-lg mb-12">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-wg-primary to-wg-primary2">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-wg-neutral">Investor Category</th>
                    <th className="text-left p-4 text-sm font-semibold text-wg-neutral">Min Withdrawal</th>
                    <th className="text-left p-4 text-sm font-semibold text-wg-neutral">Max Withdrawal</th>
                    <th className="text-left p-4 text-sm font-semibold text-wg-neutral">Processing Fee</th>
                    <th className="text-left p-4 text-sm font-semibold text-wg-neutral">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalLimits.map((limit, idx) => (
                    <tr key={idx} className="border-t border-wg-primary/10 even:bg-white">
                      <td className="p-4">
                        <div className="font-medium text-wg-primary">{limit.category}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-wg-primary">{limit.minWithdrawal}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-wg-accent" />
                          <span className="font-medium text-wg-primary">{limit.maxWithdrawal}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-wg-primary">{limit.processingFee}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary" className="bg-wg-secondary/20">
                          {limit.frequency}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Special Conditions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-wg-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                    <Shield className="h-5 w-5" />
                    Special Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {specialConditions.map((condition, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${
                        condition.severity === 'high' ? 'border-red-200 bg-red-50' :
                        condition.severity === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-white">
                            {condition.icon}
                          </div>
                          <h4 className="font-bold text-wg-primary">{condition.condition}</h4>
                        </div>
                        <p className="text-sm text-wg-primary/80">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-wg-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                    <XCircle className="h-5 w-5" />
                    Non-Refundable Scenarios
                  </CardTitle>
                  <CardDescription>
                    These situations do NOT qualify for refunds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nonRefundableScenarios.map((scenario, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-wg-primary/80">{scenario}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Refund Eligibility & Procedures */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-6">
                  Refund <span className="text-wg-secondary">Eligibility</span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-bold text-wg-primary">Eligible for Refund</h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          'Failed deposit transactions (with proof)',
                          'Duplicate payments (verified by admin)',
                          'Technical errors causing overcharges',
                          'Cancelled investments before activation',
                          'Fraudulent transactions (upon investigation)'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-wg-primary/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <XCircle className="h-6 w-6 text-red-600" />
                        <h3 className="text-lg font-bold text-wg-primary">Not Eligible for Refund</h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          'Investment losses due to market conditions',
                          'Change of mind after investment activation',
                          'Failure to meet expected returns',
                          'Processing fees and administrative charges',
                          'Funds in active investment projects'
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-wg-primary/80">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-8">
                <Card className="bg-gradient-to-br from-wg-primary/5 to-wg-accent/5 border-wg-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                      <RefreshCw className="h-5 w-5" />
                      Refund Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        'Submit refund request via support email with evidence',
                        'Admin investigation and verification (5-10 business days)',
                        'Approval decision and notification',
                        'Refund processing (additional 5-7 business days)',
                        'Funds returned to original payment method'
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-wg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-wg-primary">{idx + 1}</span>
                          </div>
                          <span className="text-wg-primary/80">{step}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 rounded-lg bg-wg-primary/10">
                      <p className="text-sm text-wg-primary/70">
                        <span className="font-bold">Note:</span> Refund requests must be submitted within 14 days of the transaction. 
                        All refunds are subject to a 10% administrative fee if approved.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-wg-primary/10">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-wg-primary mb-4">Processing Times Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-wg-primary/80">Standard Withdrawals</span>
                        <Badge>24-48 Hours</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-wg-primary/80">Urgent Withdrawals*</span>
                        <Badge variant="secondary">24-48 Hours</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-wg-primary/80">Refund Processing</span>
                        <Badge variant="outline">24-48 Hours</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-wg-primary/60 mt-4">
                      *Urgent withdrawals available for Premium+ tiers with 25% processing fee
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Contact Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary to-wg-primary2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-wg-neutral mb-6">
              Need Assistance?
            </h2>
            <p className="text-xl text-wg-neutral/90 mb-10 max-w-2xl mx-auto">
              Contact our financial operations team for withdrawal or refund inquiries
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-wg-neutral/5 border-wg-neutral/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Mail className="h-10 w-10 text-wg-secondary mb-4" />
                    <h3 className="text-lg font-bold text-wg-neutral mb-2">Email Support</h3>
                    <a 
                      href="mailto:support@watergrooveinvestment.com" 
                      className="text-wg-accent hover:underline text-lg font-medium"
                    >
                      support@watergrooveinvestment.com
                    </a>
                    <p className="text-wg-neutral/80 text-sm mt-2">
                      For withdrawal requests and general inquiries
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-wg-neutral/5 border-wg-neutral/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Phone className="h-10 w-10 text-wg-secondary mb-4" />
                    <h3 className="text-lg font-bold text-wg-neutral mb-2">Phone Support</h3>
                    <a 
                      href="tel:+2348035026480" 
                      className="text-wg-accent hover:underline text-lg font-medium"
                    >
                      +234 803 502 6480
                    </a>
                    <p className="text-wg-neutral/80 text-sm mt-2">
                      Monday - Friday, 9AM - 5PM WAT
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            
            
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyClient;