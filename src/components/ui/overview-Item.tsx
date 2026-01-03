import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface OverviewItemProps {
  label: string;
  value: string | number;
  positive?: boolean;
  className?: string;
  icon?: ReactNode;
}

export function OverviewItem({
  label,
  value,
  positive = false,
  className,
  icon
}: OverviewItemProps) {
  return (
    <div className={cn(
      "space-y-3 p-4 rounded-lg transition-all duration-200 hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-full bg-gradient-to-br from-[var(--color-wg-primary)]/10 to-transparent">
          {icon && (
            <div className="text-[var(--color-wg-primary)]">
              {icon}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-xs sm:text-sm text-[var(--color-wg-primary)] font-medium">
          {label}
        </p>
        <p
          className={cn(
            "text-lg sm:text-xl md:text-2xl font-bold leading-tight",
            positive && "text-green-600",
            !positive && "text-[var(--color-wg-primary)]"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}