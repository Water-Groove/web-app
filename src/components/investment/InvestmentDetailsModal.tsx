import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AdminInvestmentRow } from "@/types/adminType";
import { 
  Calendar, 
  DollarSign, 
  User, 
  Percent, 
  Clock,
  TrendingUp,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  XCircle,
  AlertCircle 
} from "lucide-react";
import { InvestmentStatus } from '@prisma/client';
import { formatCurrency, formatDate } from '@/lib/utils';

interface InvestmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment: AdminInvestmentRow | null;
  onAction: (investment: AdminInvestmentRow, action: string) => void;
  isAdmin?: boolean;
}

const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({
  isOpen,
  onClose,
  investment,
  onAction,
  isAdmin = false,
}) => {
  if (!investment) return null;

  // Status configuration
  const getStatusConfig = (status: InvestmentStatus) => {
    switch (status) {
      case 'ACTIVE':
        return {
          icon: PlayCircle,
          className: "bg-green-500/20 text-green-400 border-green-500/30",
          label: 'Active'
        };
      case 'PENDING_PAYMENT':
        return {
          icon: Clock,
          className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          label: 'Pending Payment'
        };
      case 'PAUSED':
        return {
          icon: PauseCircle,
          className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          label: 'Paused'
        };
      case 'COMPLETED':
        return {
          icon: CheckCircle,
          className: "bg-purple-500/20 text-purple-400 border-purple-500/30",
          label: 'Completed'
        };
      case 'CANCELLED':
        return {
          icon: XCircle,
          className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          label: 'Cancelled'
        };
      case 'REJECTED':
        return {
          icon: XCircle,
          className: "bg-red-500/20 text-red-400 border-red-500/30",
          label: 'Rejected'
        };
      default:
        return {
          icon: AlertCircle,
          className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          label: status
        };
    }
  };

  // Calculate progress if started
  const calculateProgress = () => {
    if (!investment.startDate || !investment.endDate) return 0;
    
    const start = new Date(investment.startDate).getTime();
    const end = new Date(investment.endDate).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  // Calculate expected ROI
  const calculateExpectedROI = () => {
    const roi = (investment.principalAmount * investment.roiRateSnapshot * investment.durationMonths) / 12;
    return formatCurrency(roi);
  };

  const statusConfig = getStatusConfig(investment.status);
  const progress = calculateProgress();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-wg-neutral border-wg-accent/20 text-wg-primary max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Investment Details</DialogTitle>
          <DialogDescription className="text-wg-primary/60">
            Investment ID: {investment.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={statusConfig.className}>
              <statusConfig.icon className="mr-2 h-4 w-4" />
              {statusConfig.label}
            </Badge>
            <span className="text-sm text-wg-primary/60">
              Created: {formatDate(investment.createdAt)}
            </span>
          </div>

          <Separator className="bg-wg-accent/20" />

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Principal Amount:</span>
              </div>
              <p className="text-2xl font-bold text-wg-primary">
                {formatCurrency(investment.principalAmount)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">User ID:</span>
              </div>
              <p className="font-medium text-wg-primary">{investment.userId}</p>
            </div>
          </div>

          {/* Investment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">ROI Rate:</span>
              </div>
              <p className="text-xl font-bold text-wg-primary">
                {(investment.roiRateSnapshot * 100).toFixed(2)}%
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Duration:</span>
              </div>
              <p className="text-xl font-bold text-wg-primary">
                {investment.durationMonths} months
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Expected ROI:</span>
              </div>
              <p className="text-xl font-bold text-wg-primary">
                {calculateExpectedROI()}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <span className="text-sm text-wg-primary/60">Investment Category:</span>
            <p className="text-wg-primary font-medium bg-wg-primary/10 p-2 rounded">
              {investment.categoryId}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">Start Date:</span>
              </div>
              <p className="text-wg-primary">{formatDate(investment.startDate)}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-wg-accent" />
                <span className="text-sm text-wg-primary/60">End Date:</span>
              </div>
              <p className="text-wg-primary">{formatDate(investment.endDate)}</p>
            </div>
          </div>

          {/* Progress Bar (for active investments) */}
          {(investment.status === 'ACTIVE' || investment.status === 'PAUSED') && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-wg-primary/60">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-wg-primary" />
              <div className="flex justify-between text-xs text-wg-primary/40">
                <span>{formatDate(investment.startDate)}</span>
                <span>{formatDate(investment.endDate)}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-wg-accent/30 text-wg-primary hover:bg-wg-accent/10"
          >
            Close
          </Button>
          
          {isAdmin && investment.status === 'PENDING_PAYMENT' && (
            <>
              <Button
                onClick={() => {
                  onAction(investment, 'ACTIVE');
                  onClose();
                }}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Approve Investment
              </Button>
              <Button
                onClick={() => {
                  onAction(investment, 'REJECTED');
                  onClose();
                }}
                variant="destructive"
              >
                Reject Investment
              </Button>
            </>
          )}
          
          {isAdmin && investment.status === 'ACTIVE' && (
            <Button
              onClick={() => {
                onAction(investment, 'PAUSE');
                onClose();
              }}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Pause Investment
            </Button>
          )}
          
          {isAdmin && investment.status === 'PAUSED' && (
            <Button
              onClick={() => {
                onAction(investment, 'ACTIVE');
                onClose();
              }}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Resume Investment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDetailsModal;