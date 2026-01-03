/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield,
  Lock,
  Eye,
  FileText,
  Users,
  Database,
  Cookie,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Key,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicyClient = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <Database className="h-6 w-6" />,
      points: [
        'Personal details (name, email, phone number)',
        'Account and login information',
        'Transaction and investment records',
        'Communication history with our support team',
        'KYC documentation when required',
        'Device and browser information'
      ]
    },
    {
      title: 'How We Use Information',
      icon: <Eye className="h-6 w-6" />,
      points: [
        'Create and manage user accounts securely',
        'Process investments and withdrawal requests',
        'Communicate important updates and notifications',
        'Improve platform functionality and user experience',
        'Comply with legal and regulatory requirements',
        'Prevent fraudulent activities and enhance security'
      ]
    },
    {
      title: 'Data Protection Measures',
      icon: <Shield className="h-6 w-6" />,
      points: [
        'End-to-end encryption for sensitive data',
        'Restricted access to authorized personnel only',
        'Regular security audits and vulnerability assessments',
        'Secure data centers with physical protection',
        'Employee training on data privacy protocols',
        'Incident response and breach notification procedures'
      ]
    },
    {
      title: 'Data Retention',
      icon: <Clock className="h-6 w-6" />,
      points: [
        'Transaction records: 7 years minimum',
        'Account information: While account is active + 2 years',
        'Communication logs: 3 years',
        'KYC documentation: 10 years as per regulations',
        'Analytics data: 2 years anonymized',
        'Right to request early deletion (subject to legal requirements)'
      ]
    }
  ];

  const userRights = [
    {
      title: 'Access Rights',
      description: 'Request a copy of your personal data',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: 'Correction Rights',
      description: 'Update inaccurate or incomplete information',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      title: 'Deletion Rights',
      description: 'Request deletion of your data (with limitations)',
      icon: <Key className="h-5 w-5" />
    },
    {
      title: 'Objection Rights',
      description: 'Object to certain types of processing',
      icon: <AlertCircle className="h-5 w-5" />
    }
  ];

  const cookies = [
    { type: 'Essential', purpose: 'Site functionality and security', duration: 'Session' },
    { type: 'Performance', purpose: 'Analytics and improvement', duration: '2 years' },
    { type: 'Functional', purpose: 'Personalization', duration: '1 year' },
    { type: 'Marketing', purpose: 'Targeted advertising (opt-in)', duration: '1 year' }
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
              <Lock className="h-5 w-5 text-wg-secondary" />
              <Badge variant="outline" className="bg-wg-primary/20 border-wg-secondary/30 text-wg-neutral">
                Privacy Commitment
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6">
              Privacy <span className="text-wg-secondary">Policy</span>
            </h1>
            
            <div className="space-y-4 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 leading-relaxed">
                At <span className="text-wg-secondary font-semibold">Water Grove</span>, we take your privacy seriously. This policy explains how we collect, use, disclose, and safeguard your information when you use our investment platform.
              </p>
              <div className="bg-wg-primary/30 backdrop-blur-sm rounded-xl p-6 border border-wg-accent/20">
                <p className="text-wg-neutral font-medium">
                  "Transparency is our core principle—this includes being transparent about how we handle your personal data."
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#data-protection">
                <Button size="lg" className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Data Protection Measures <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/legal/terms-conditions" className="sm:ml-4">
                <Button size="lg" variant="outline" className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300">
                  View Terms & Conditions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated & Key Points */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="border-wg-primary/20 shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-sm text-wg-primary/60 mb-2">Last Updated</div>
                    <div className="text-2xl font-bold text-wg-primary">December, 2025</div>
                  </div>
                  <div className="text-center border-x border-wg-primary/20 px-8">
                    <div className="text-sm text-wg-primary/60 mb-2">Policy Version</div>
                    <div className="text-2xl font-bold text-wg-primary">v1.0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-wg-primary/60 mb-2">Applicable To</div>
                    <div className="text-2xl font-bold text-wg-primary">All Investors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <Card key={index} className="border-wg-primary/10 hover:border-wg-accent/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-wg-primary/10">
                          <div className="text-wg-primary">{section.icon}</div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-wg-primary">
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-wg-accent flex-shrink-0 mt-0.5" />
                            <span className="text-wg-primary/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* User Rights */}
                <Card id="data-protection" className="border-wg-accent/20 bg-gradient-to-br from-wg-primary/5 to-wg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-wg-primary flex items-center gap-3">
                      <Users className="h-6 w-6" />
                      Your Data Rights
                    </CardTitle>
                    <CardDescription>
                      As a Water Grove user, you have the following rights regarding your personal data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {userRights.map((right, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/50 border border-wg-primary/10">
                          <div className="p-2 rounded-lg bg-wg-secondary/20">
                            <div className="text-wg-primary">{right.icon}</div>
                          </div>
                          <div>
                            <h4 className="font-bold text-wg-primary mb-1">{right.title}</h4>
                            <p className="text-sm text-wg-primary/70">{right.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cookies Section */}
                <Card className="border-wg-primary/10">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-wg-primary flex items-center gap-3">
                      <Cookie className="h-5 w-5" />
                      Cookies & Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-wg-primary/80">
                        Our platform uses cookies and similar technologies to enhance your experience and analyze usage patterns.
                      </p>
                      
                      <div className="overflow-hidden rounded-lg border border-wg-primary/10">
                        <table className="w-full">
                          <thead className="bg-wg-primary/5">
                            <tr>
                              <th className="text-left p-3 text-sm font-semibold text-wg-primary">Type</th>
                              <th className="text-left p-3 text-sm font-semibold text-wg-primary">Purpose</th>
                              <th className="text-left p-3 text-sm font-semibold text-wg-primary">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cookies.map((cookie, idx) => (
                              <tr key={idx} className="border-t border-wg-primary/10 even:bg-white/50">
                                <td className="p-3 text-sm text-wg-primary/90">{cookie.type}</td>
                                <td className="p-3 text-sm text-wg-primary/90">{cookie.purpose}</td>
                                <td className="p-3 text-sm text-wg-primary/90">{cookie.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="text-sm text-wg-primary/60">
                        You can manage cookie preferences through your browser settings.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-gradient-to-br from-wg-primary to-wg-primary2 border-0">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-wg-neutral">
                      Contact Our Data Protection Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-wg-secondary" />
                        <div>
                          <div className="text-sm text-wg-neutral/80">Email</div>
                          <div className="text-wg-neutral font-medium">Support@watergrooveinvestment.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-wg-secondary" />
                        <div>
                          <div className="text-sm text-wg-neutral/80">Phone</div>
                          <div className="text-wg-neutral font-medium">Number 
+234 803 502 6480</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-wg-secondary" />
                        <div>
                          <div className="text-sm text-wg-neutral/80">Address</div>
                          <div className="text-wg-neutral font-medium">Data Protection Office, Water Grove HQ</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-wg-neutral/20" />
                    
                    <div className="text-sm text-wg-neutral/80">
                      For data access requests or privacy concerns, please contact us with "Privacy Request" in the subject line.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sharing Section */}
      <section className="py-20 bg-gradient-to-r from-wg-primary/5 via-wg-secondary/5 to-wg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-wg-primary mb-4">
                Data <span className="text-wg-secondary">Sharing</span> & Disclosure
              </h2>
              <p className="text-lg text-wg-primary/70">
                Water Grove does not sell, rent, or trade personal data. Information may be shared only under specific circumstances.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-wg-primary/10">
                <CardHeader>
                  <AlertCircle className="h-10 w-10 text-wg-accent mx-auto mb-4" />
                  <CardTitle className="text-lg font-bold text-wg-primary">Legal Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wg-primary/70 text-sm">
                    When required by law or regulation, including court orders or government requests
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-wg-primary/10">
                <CardHeader>
                  <Shield className="h-10 w-10 text-wg-accent mx-auto mb-4" />
                  <CardTitle className="text-lg font-bold text-wg-primary">Service Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wg-primary/70 text-sm">
                    With trusted partners strictly for operational purposes under confidentiality agreements
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-wg-primary/10">
                <CardHeader>
                  <Users className="h-10 w-10 text-wg-accent mx-auto mb-4" />
                  <CardTitle className="text-lg font-bold text-wg-primary">Safety & Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wg-primary/70 text-sm">
                    To protect the rights, property, or safety of Water Grove, our users, or the public
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Updates & Acceptance */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-wg-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-wg-primary">
                  Policy Updates & Acceptance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-wg-primary/5 rounded-xl p-6">
                  <h4 className="font-bold text-wg-primary mb-3">Policy Changes</h4>
                  <p className="text-wg-primary/80">
                    We may update this privacy policy periodically. Significant changes will be notified through our platform or via email. Your continued use of the Water Grove platform after any changes constitutes your acceptance of the updated policy.
                  </p>
                </div>
                
                <div className="bg-wg-secondary/5 rounded-xl p-6 border border-wg-secondary/20">
                  <h4 className="font-bold text-wg-primary mb-3">Your Acceptance</h4>
                  <p className="text-wg-primary/80">
                    By registering, accessing, or using the Water Grove Investment Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                  </p>
                </div>
                
                <div className="text-center pt-4">
                  <Link href="/terms">
                    <Button variant="outline" className="border-wg-primary text-wg-primary hover:bg-wg-primary hover:text-wg-neutral">
                      Read Full Terms & Conditions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyClient;