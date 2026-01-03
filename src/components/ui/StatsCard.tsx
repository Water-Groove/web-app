"use client"

import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "./card";


// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className="bg-wg-neutral border-wg-accent/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-wg-accent/20 rounded w-3/4"></div>
            <div className="h-8 bg-wg-accent/20 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-wg-neutral border-wg-accent/20 hover:border-wg-accent/40 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-wg-primary/60">{title}</p>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-wg-primary mt-2">
              {typeof value === "number" ? formatCurrency(value) : value}
            </h3>
            {description && (
              <p className="text-xs text-wg-primary/40 mt-2">{description}</p>
            )}
          </div>
          {icon && (
            <div className="p-3 rounded-full bg-wg-accent/10">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};