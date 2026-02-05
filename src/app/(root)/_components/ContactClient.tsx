"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  User,
  CheckCircle,
  ArrowRight,
  Shield,
  Users,
  Headset,
  Globe,
  TrendingUp,
  ChevronRight,
  Eye,
  Target,
  MessageCircle,
  AlertCircle,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// EmailJS configuration - Make sure these are set in your .env.local file
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID_ADMIN =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN || "";
const EMAILJS_TEMPLATE_ID_USER =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

// Type declarations for EmailJS
declare global {
  interface Window {
    emailjs?: {
      send: (
        serviceId: string,
        templateId: string,
        templateParams: any
      ) => Promise<{ status: number; text: string }>;
      init: (publicKey: string) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Particle {
  left: number;
  top: number;
  size: number;
}

const ContactClient = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailJSLoaded, setIsEmailJSLoaded] = useState(false);
  const [emailJSError, setEmailJSError] = useState<string | null>(null);
  const [emailJSStatus, setEmailJSStatus] = useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  const emailJSScriptRef = useRef<HTMLScriptElement | null>(null);

  // WhatsApp contact info
  const WHATSAPP_NUMBER = "2348035026480"; // Remove leading zero and country code
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

  // Phone number for direct call (with proper formatting)
  const PHONE_NUMBER = "+2348035026480";
  const PHONE_LINK = `tel:${PHONE_NUMBER}`;

  // Email address
  const EMAIL_ADDRESS = "support@watergrooveinvestment.com";

  // Updated Contact Information with Abuja addresses
  const contactInfo = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Gwaripa Office",
      details: ["Suite S3, Bricks & More Plaza", "Gwaripa", "Abuja, Nigeria"],
      color: "from-blue-500/20 to-cyan-500/20",
      type: "headquarters",
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Phone Support",
      details: ["+234 803 502 6480", "Available 24/7"],
      color: "from-emerald-500/20 to-green-500/20",
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      details: ["support@watergrooveinvestment.com", "Response within 24h"],
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
      ],
      color: "from-rose-500/20 to-pink-500/20",
    },
  ];

  // Additional Office Addresses Section
  const officeAddresses = [
    {
      title: "Gwaripa Office (Headquarters)",
      address: "Suite S3, Bricks & More Plaza, Gwaripa, Abuja",
      icon: <Building className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Utako Office",
      address:
        "First floor left wing, main building, Ojimadu Nwaeze plaza, Solomon Lar Road, opposite Top Rank hotel Utako, Abuja",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  const teamDepartments = [
    {
      department: "Investment Advisory",
      contact: "support@watergrooveinvestment.com",
      phone: "+234 803 502 6480",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      department: "Client Relations",
      contact: "support@watergrooveinvestment.com",
      phone: "+234 803 502 6480",
      icon: <Users className="h-6 w-6" />,
      color: "from-emerald-500/20 to-green-500/20",
    },
    {
      department: "Technical Support",
      contact: "support@watergrooveinvestment.com",
      phone: "+234 803 502 6480",
      icon: <Headset className="h-6 w-6" />,
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      department: "Withdrawal Support",
      contact: "support@watergrooveinvestment.com",
      phone: "+234 803 502 6480",
      icon: <Shield className="h-6 w-6" />,
      color: "from-rose-500/20 to-pink-500/20",
    },
  ];

  // Fixed floating particle positions
  const fixedParticles: Particle[] = [
    { left: 10, top: 20, size: 8 },
    { left: 25, top: 60, size: 12 },
    { left: 40, top: 30, size: 10 },
    { left: 60, top: 70, size: 15 },
    { left: 75, top: 40, size: 9 },
    { left: 85, top: 25, size: 11 },
    { left: 15, top: 75, size: 14 },
    { left: 50, top: 15, size: 7 },
    { left: 35, top: 85, size: 13 },
    { left: 90, top: 55, size: 10 },
    { left: 20, top: 45, size: 12 },
    { left: 65, top: 90, size: 8 },
  ];

  useEffect(() => {
    // Check if EmailJS is configured
    const isEmailJSConfigured =
      EMAILJS_SERVICE_ID &&
      EMAILJS_TEMPLATE_ID_ADMIN &&
      EMAILJS_TEMPLATE_ID_USER &&
      EMAILJS_PUBLIC_KEY;

    if (!isEmailJSConfigured) {
      console.warn("EmailJS is not configured. Check your .env.local file.");
      setEmailJSStatus("error");
      setEmailJSError(
        "EmailJS is not configured. Contact form will use fallback."
      );
      return;
    }

    // Check if script is already loaded
    if (window.emailjs) {
      setIsEmailJSLoaded(true);
      setEmailJSStatus("loaded");
      return;
    }

    setEmailJSStatus("loading");

    // Load EmailJS script
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.id = "emailjs-script";

    script.onload = () => {
      // Initialize EmailJS
      if (window.emailjs) {
        try {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
          setIsEmailJSLoaded(true);
          setEmailJSStatus("loaded");
          setEmailJSError(null);
          console.log("EmailJS loaded successfully");
        } catch (error) {
          console.error("EmailJS initialization failed:", error);
          setEmailJSStatus("error");
          setEmailJSError("EmailJS initialization failed");
        }
      } else {
        console.error("EmailJS library not found");
        setEmailJSStatus("error");
        setEmailJSError("EmailJS library failed to load");
      }
    };

    script.onerror = () => {
      console.error("Failed to load EmailJS script");
      setEmailJSStatus("error");
      setEmailJSError("Failed to load EmailJS script");
    };

    document.head.appendChild(script);
    emailJSScriptRef.current = script;

    return () => {
      // Clean up script if component unmounts
      if (
        emailJSScriptRef.current &&
        document.head.contains(emailJSScriptRef.current)
      ) {
        document.head.removeChild(emailJSScriptRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailJSError(null);

    try {
      // Format current time
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Template parameters
      const templateParams = {
        name: formData.name,
        time: formattedTime,
        message: formData.message,
        email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject || "No subject provided",
      };

      console.log("Attempting to send email...", {
        emailJSLoaded: isEmailJSLoaded,
        emailJSStatus,
        hasConfig: !!EMAILJS_SERVICE_ID,
      });

      // If EmailJS is configured and loaded, use it
      if (isEmailJSLoaded && window.emailjs && EMAILJS_SERVICE_ID) {
        console.log("Sending via EmailJS...");

        try {
          // Send to admin
          const result = await window.emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID_ADMIN,
            templateParams
          );

          console.log("EmailJS send result:", result);

          if (result.status === 200) {
            // Send confirmation to user
            try {
              await window.emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID_USER,
                templateParams
              );
              console.log("Confirmation email sent to user");
            } catch (userError) {
              console.warn("Failed to send confirmation to user:", userError);
              // Continue even if user confirmation fails
            }
          } else {
            throw new Error(`EmailJS returned status ${result.status}`);
          }
        } catch (emailJSError) {
          console.error("EmailJS send failed:", emailJSError);
          throw emailJSError;
        }
      } else {
        // Fallback - log to console
        console.warn("EmailJS not available, using fallback");
        console.log("Contact form submission (fallback):", templateParams);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show fallback warning
        setEmailJSError(
          "Email service is in testing mode. Your message was logged but not sent. For immediate assistance, please use WhatsApp or call us directly."
        );
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setEmailJSError(null);
      }, 5000);
    } catch (error: any) {
      console.error("Error in contact form:", error);
      setIsSubmitting(false);

      // User-friendly error messages
      let errorMessage =
        "There was an error sending your message. Please try again or contact us directly.";

      if (error?.status === 0 || error?.message?.includes("Network")) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
      } else if (error?.text?.includes("Invalid template")) {
        errorMessage =
          "Email template configuration error. Please contact support.";
      } else if (error?.text?.includes("Invalid service")) {
        errorMessage =
          "Email service configuration error. Please contact support.";
      } else if (error?.text?.includes("Invalid public key")) {
        errorMessage =
          "Email service authentication error. Please contact support.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setEmailJSError(errorMessage);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openWhatsApp = () => {
    const message = `Hello Water Grove,\n\nI would like to inquire about:\n\n`;
    window.open(
      `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const openWhatsAppWithCustomMessage = (prefill: string) => {
    const message = `Hello Water Grove,\n\nI would like to inquire about: ${prefill}\n\n`;
    window.open(
      `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Check if EmailJS is properly configured
  const isEmailJSConfigured =
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID_ADMIN &&
    EMAILJS_TEMPLATE_ID_USER &&
    EMAILJS_PUBLIC_KEY;

  return (
    <div className="min-h-screen bg-gradient-to-b from-wg-neutral via-white to-wg-primary/5">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-wg-secondary via-wg-accent to-wg-secondary"></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {fixedParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-wg-accent/10 animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${10 + (i % 5) * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-wg-secondary/90 text-wg-primary hover:bg-wg-secondary/80 border-none animate-pulse animate-duration-2000">
              <MessageSquare className="mr-2 h-4 w-4" />
              GET IN TOUCH WITH US
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wg-neutral mb-6 leading-tight">
              Connect With
              <span className="block text-wg-secondary mt-2">Water Grove</span>
            </h1>

            <p className="text-lg md:text-xl text-wg-neutral/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Have questions about investments, need support, or want to explore
              partnership opportunities? Our team is ready to assist you on your
              investment journey with transparency and expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact-form">
                <Button className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href={PHONE_LINK}>
                <Button
                  variant="outline"
                  className="border-wg-neutral text-wg-primary hover:bg-wg-neutral/10 px-8 py-6 rounded-xl hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <Button
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-wg-neutral font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-wg-primary2"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-xl group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-wg-secondary to-wg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${info.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-wg-primary">{info.icon}</div>
                    </div>
                    <h3 className="font-bold text-wg-primary mb-3 text-lg">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => {
                        if (index === 1 && idx === 0) {
                          // Phone number
                          return (
                            <a
                              key={idx}
                              href={PHONE_LINK}
                              className="text-sm text-wg-primary/70 hover:text-wg-accent transition-colors block"
                            >
                              {detail}
                            </a>
                          );
                        }
                        if (index === 2 && idx === 0) {
                          // Email address
                          return (
                            <a
                              key={idx}
                              href={`mailto:${detail}`}
                              className="text-sm text-wg-primary/70 hover:text-wg-accent transition-colors block"
                            >
                              {detail}
                            </a>
                          );
                        }
                        return (
                          <p key={idx} className="text-sm text-wg-primary/70">
                            {detail}
                          </p>
                        );
                      })}
                    </div>
                    {info.type === "headquarters" && (
                      <span className="mt-2 inline-block px-2 py-1 text-xs bg-wg-secondary/10 text-wg-secondary rounded-full">
                        Headquarters
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Addresses Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 border border-wg-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-wg-primary flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Our Office Locations
                </CardTitle>
                <CardDescription className="text-wg-primary/70">
                  Visit us at our convenient Abuja locations
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {officeAddresses.map((office, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${office.color}`}>
                          {office.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-wg-primary text-sm mb-1">
                            {office.title}
                          </h4>
                          <p className="text-sm text-wg-primary/70 leading-snug">
                            {office.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Link */}
                <div className="mt-6 pt-6 border-t border-wg-primary/10">
                  <p className="text-sm text-wg-primary/80 mb-3">
                    Need directions to our offices?
                  </p>
                  <a
                    href="https://maps.google.com/?q=Gwaripa+Abuja+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-wg-accent hover:text-wg-secondary transition-colors text-sm font-medium"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Google Maps
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card
                className="bg-white border border-wg-primary/10 hover:shadow-xl transition-all duration-300"
                id="contact-form"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-wg-primary">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* EmailJS Status Warning */}
                  {!isEmailJSConfigured && (
                    <Alert className="mb-6 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-700">
                        Email service is not configured. For immediate
                        assistance, please use WhatsApp or call us directly.
                      </AlertDescription>
                    </Alert>
                  )}

                  {emailJSError && !isSubmitted && (
                    <Alert className="mb-6 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertDescription className="text-amber-700">
                        {emailJSError}
                      </AlertDescription>
                    </Alert>
                  )}

                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-wg-primary/10 to-wg-secondary/10 mb-6">
                        <CheckCircle className="h-8 w-8 text-wg-secondary" />
                      </div>
                      <h3 className="text-2xl font-bold text-wg-primary mb-3">
                        Message Received!
                      </h3>
                      <p className="text-wg-primary/70 mb-6">
                        Thank you for contacting Water Grove. Our team will
                        respond to your inquiry within 24 hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral font-bold px-6 py-6 rounded-xl"
                        >
                          Send Another Message
                        </Button>
                        <Button
                          onClick={openWhatsApp}
                          variant="outline"
                          className="border-wg-primary text-wg-primary hover:bg-wg-primary/10 px-6 py-6 rounded-xl"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Chat on WhatsApp
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-wg-primary font-medium"
                          >
                            Full Name *
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-wg-primary font-medium"
                          >
                            Email Address *
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@example.com"
                              className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-wg-primary font-medium"
                        >
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-wg-primary/50" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+234 803 502 6480"
                            className="pl-10 bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-wg-primary font-medium"
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-wg-primary font-medium"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[150px] bg-white border-wg-primary/20 text-wg-primary focus:border-wg-accent"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="rounded border-wg-primary/20 text-wg-primary focus:ring-wg-primary"
                          required
                          disabled={isSubmitting}
                        />
                        <Label
                          htmlFor="privacy"
                          className="text-sm text-wg-primary/70"
                        >
                          I agree to the privacy policy and terms of service
                        </Label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-wg-primary hover:bg-wg-primary/90 text-wg-neutral font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>

                      <div className="text-center mt-4">
                        <p className="text-xs text-wg-primary/60">
                          Having trouble with the form?
                          <button
                            type="button"
                            onClick={openWhatsApp}
                            className="text-wg-accent hover:underline ml-1"
                          >
                            Chat with us on WhatsApp instead
                          </button>
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Details & Departments */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="bg-gradient-to-br from-wg-primary/5 to-wg-secondary/5 border border-wg-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">
                    Quick Contact Options
                  </CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Prefer to reach out directly? Here are quick ways to connect
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                      <Phone className="h-5 w-5 text-wg-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">Call Us Now</h4>
                      <p className="text-wg-primary/70 text-sm">
                        Speak directly with our investment specialists
                      </p>
                      <a
                        href={PHONE_LINK}
                        className="text-wg-primary font-medium hover:text-wg-accent transition-colors"
                      >
                        +234 803 502 6480
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">
                        WhatsApp Chat
                      </h4>
                      <p className="text-wg-primary/70 text-sm">
                        Chat with us instantly on WhatsApp
                      </p>
                      <Button
                        onClick={openWhatsApp}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 mt-2"
                      >
                        Start WhatsApp Chat
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-wg-primary/10 hover:border-wg-accent/50 transition-colors">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10">
                      <Mail className="h-5 w-5 text-wg-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-wg-primary">
                        Email Support
                      </h4>
                      <p className="text-wg-primary/70 text-sm">
                        Get detailed responses via email
                      </p>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="text-wg-primary font-medium hover:text-wg-accent transition-colors"
                      >
                        {EMAIL_ADDRESS}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Buttons */}
              <Card className="bg-white border border-wg-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl text-wg-primary">
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-wg-primary/70">
                    Common inquiries - connect instantly
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() =>
                        openWhatsAppWithCustomMessage("Investment Information")
                      }
                      variant="outline"
                      className="border-wg-primary/20 hover:border-wg-accent text-wg-primary hover:bg-wg-primary/5 h-auto py-3"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Investment Info
                    </Button>
                    <Button
                      onClick={() =>
                        openWhatsAppWithCustomMessage("Account Support")
                      }
                      variant="outline"
                      className="border-wg-primary/20 hover:border-wg-accent text-wg-primary hover:bg-wg-primary/5 h-auto py-3"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Account Help
                    </Button>
                    <Button
                      onClick={() =>
                        openWhatsAppWithCustomMessage("Withdrawal Issues")
                      }
                      variant="outline"
                      className="border-wg-primary/20 hover:border-wg-accent text-wg-primary hover:bg-wg-primary/5 h-auto py-3"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Withdrawal
                    </Button>
                    <Button
                      onClick={() =>
                        openWhatsAppWithCustomMessage("Technical Support")
                      }
                      variant="outline"
                      className="border-wg-primary/20 hover:border-wg-accent text-wg-primary hover:bg-wg-primary/5 h-auto py-3"
                    >
                      <Headset className="h-4 w-4 mr-2" />
                      Technical
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openWhatsApp}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-wg-neutral shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-wg-primary2 via-wg-primary to-wg-primary/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-wg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wg-neutral mb-6">
              Ready to <span className="text-wg-secondary">Connect</span> With
              Us?
            </h2>

            <div className="bg-wg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-wg-accent/20 mb-10">
              <p className="text-lg md:text-xl text-wg-neutral/90 mb-8 leading-relaxed">
                Whether you're ready to start investing or have questions about
                our platform, our team is here to help you every step of the way
                with transparency and expertise.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Target className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">
                    Clear Communication
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-accent/20">
                    <Clock className="h-5 w-5 text-wg-accent" />
                  </div>
                  <span className="text-wg-neutral font-medium">
                    24/7 Support
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 rounded-lg bg-wg-secondary/20">
                    <Eye className="h-5 w-5 text-wg-secondary" />
                  </div>
                  <span className="text-wg-neutral font-medium">
                    Transparent Process
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/api/auth/login">
                <Button
                  size="lg"
                  className="bg-wg-secondary hover:bg-wg-secondary/90 text-wg-primary font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Investing Today
                </Button>
              </Link>
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-wg-neutral font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Risk disclaimer */}
            <div className="mt-10 pt-8 border-t border-wg-neutral/20">
              <p className="text-wg-neutral/80 text-sm mb-2">
                <span className="font-bold">Important:</span> All investments
                carry risk. Water Grove does not guarantee profits but applies
                structured risk management.
              </p>
              <p className="text-wg-neutral/60 text-xs">
                Past performance is not indicative of future results. Please
                review investment terms carefully.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactClient;
