"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Lock,
  Building,
  TrendingUp,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Edit,
  Banknote,
} from "lucide-react";
import { UserProfileSettings } from "@/types/type";
import { formatCurrency, formatDate } from "@/lib/utils";

interface SettingsClientProps {
  profile: UserProfileSettings;
  isFallbackData?: boolean;
}

const SettingsClient: React.FC<SettingsClientProps> = ({
  profile,
  isFallbackData = false,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Format percentage
  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  // Handle edit profile
  const handleEditProfile = () => {
    // In a real app, this would open a modal or navigate to edit page
    console.log("Edit profile clicked");
    // router.push("/settings/edit");
  };

  // Skeleton loader component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <Skeleton className="h-12 w-48" />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  console.log(profile)

  return (
    <div className="min-h-screen bg-wg-neutral p-4 md:p-6">
      {/* Fallback Data Alert */}
      {isFallbackData && (
        <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/30">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertTitle className="text-yellow-700">Demo Mode</AlertTitle>
          <AlertDescription className="text-yellow-600/80">
            Showing demo profile data. In production, this will show your actual
            profile.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="bg-white border-wg-accent/20 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-wg-primary flex items-center gap-2">
                  <User className="h-5 w-5 text-wg-primary" />
                  Profile Information
                </CardTitle>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditProfile}
                  className="border-wg-accent/30 bg-wg-primary text-wg-neutral hover:bg-wg-secondary"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button> */}
              </div>
              <CardDescription className="text-wg-primary/60">
                Your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture and Basic Info */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-wg-accent/10 flex items-center justify-center">
                    {profile.picture ? (
                      <img
                        src={profile.picture}
                        alt={profile.fullName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-wg-primary" />
                    )}
                  </div>
                  {profile.isActive && (
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-wg-primary">
                    {profile.fullName}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={profile.isActive ? "default" : "secondary"}
                      className={
                        profile.isActive
                          ? "bg-green-500/20 text-green-600 border-green-500/30"
                          : "bg-red-500/20 text-red-600 border-red-500/30"
                      }
                    >
                      {profile.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm text-wg-primary/60">
                      Member since {formatDate(profile.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-wg-accent/20" />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                  <p className="text-wg-primary font-medium">{profile.email}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </div>
                  <p className="text-wg-primary font-medium">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                    <Shield className="h-4 w-4" />
                    User ID
                  </div>
                  <p className="text-wg-primary font-mono text-sm">
                    {profile.id}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                    <Calendar className="h-4 w-4" />
                    Account Created
                  </div>
                  <p className="text-wg-primary font-medium">
                    {formatDate(profile.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-wg-accent/20 py-3">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-wg-primary/60">
                      Last updated: Recently
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => router.refresh()}
                      className="border-wg-accent/30 bg-wg-primary text-wg-neutral hover:bg-wg-secondary"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Investment Category Card */}
          {profile.investmentCategory && (
            <Card className="bg-white border-wg-accent/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-wg-primary flex items-center gap-2">
                  <Building className="h-5 w-5 text-wg-primary" />
                  Investment Plan
                </CardTitle>
                <CardDescription className="text-wg-primary/60">
                  Your current investment category details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-wg-primary">
                        {profile.investmentCategory.name}
                      </h3>
                      <p className="text-wg-primary/60 text-sm mt-1">
                        {profile.investmentCategory.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        profile.investmentCategory.isActive
                          ? "default"
                          : "secondary"
                      }
                      className={
                        profile.investmentCategory.isActive
                          ? "bg-green-500/20 text-green-600 border-green-500/30"
                          : "bg-gray-500/20 text-gray-600 border-gray-500/30"
                      }
                    >
                      {profile.investmentCategory.isActive
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </div>

                  <Separator className="bg-wg-accent/20" />

                  {/* Investment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                        <Banknote className="h-4 w-4" />
                        Investment Range
                      </div>
                      <p className="text-wg-primary font-medium">
                        {formatCurrency(profile.investmentCategory.minAmount)}
                        {profile.investmentCategory.maxAmount && (
                          <>
                            {" "}
                            -{" "}
                            {formatCurrency(
                              profile.investmentCategory.maxAmount
                            )}
                          </>
                        )}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                        <TrendingUp className="h-4 w-4" />
                        Monthly ROI
                      </div>
                      <p className="text-wg-primary font-medium">
                        {formatPercentage(
                          profile.investmentCategory.monthlyRoiRate
                        )}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                        <Clock className="h-4 w-4" />
                        Duration
                      </div>
                      <p className="text-wg-primary font-medium">
                        {profile.investmentCategory.durationMonths} months
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-wg-primary/60">
                        <Calendar className="h-4 w-4" />
                        Created
                      </div>
                      <p className="text-wg-primary font-medium">
                        {formatDate(
                          new Date(profile?.investmentCategory?.createdAt ?? "")
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Annual ROI Calculation */}
                  <div className="bg-wg-accent/5 border border-wg-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-wg-primary mb-2">
                      Annual Return Estimate
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-wg-primary/60">
                          Monthly Return
                        </p>
                        <p className="text-lg font-bold text-wg-primary">
                          {formatPercentage(
                            profile.investmentCategory.monthlyRoiRate
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-wg-primary/60">
                          Annual Return
                        </p>
                        <p className="text-lg font-bold text-wg-primary">
                          {formatPercentage(
                            profile.investmentCategory.monthlyRoiRate * 12
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-wg-primary/60">
                          Total Duration Return
                        </p>
                        <p className="text-lg font-bold text-wg-primary">
                          {formatPercentage(
                            profile.investmentCategory.monthlyRoiRate *
                              profile.investmentCategory.durationMonths
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Account Actions */}
        <div className="space-y-6">

          {/* Account Status Card */}
          <Card className="bg-white border-wg-accent/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-wg-primary flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-wg-primary" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-wg-primary">
                    Account Verified
                  </span>
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-wg-primary">
                    Email Verified
                  </span>
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-wg-primary">
                    Phone Verified
                  </span>
                  <Badge
                    className={
                      profile.phone
                        ? "bg-green-500/20 text-green-600 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                    }
                  >
                    {profile.phone ? "Verified" : "Not Set"}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-wg-accent/20" />

              <div className="space-y-2">
                <h4 className="font-semibold text-wg-primary">
                  Account Health
                </h4>
                <div className="w-full bg-wg-accent/10 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <p className="text-xs text-wg-primary/60">
                  Your account security score: 85/100
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          {/* <Card className="bg-white border-wg-accent/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-wg-primary">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-wg-primary/60 mb-4">
                Contact our support team for assistance with your account
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-wg-accent/30 text-wg-primary hover:bg-wg-secondary"
                  onClick={() => router.push("/support")}
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-wg-accent/30 text-wg-primary hover:bg-wg-secondary"
                  onClick={() => router.push("/faq")}
                >
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default SettingsClient;
