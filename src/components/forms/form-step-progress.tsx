import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  label: string
  description?: string
}

interface FormStepProgressProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
  className?: string
}

export function FormStepProgress({
  steps,
  currentStep,
  completedSteps,
  className,
}: FormStepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {/* Step Circle */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                completedSteps.includes(step.id)
                  ? "bg-green-500 border-green-500 text-white"
                  : currentStep === step.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 bg-background text-muted-foreground"
              )}
            >
              {completedSteps.includes(step.id) ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{step.id}</span>
              )}
            </div>
            
            {/* Step Label */}
            <span className="text-xs mt-2 text-center font-medium">
              {step.label}
            </span>
            
            {/* Step Description */}
            {step.description && (
              <span className="text-xs mt-1 text-muted-foreground text-center">
                {step.description}
              </span>
            )}
            
            {/* Connector Line (except for last step) */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-4 left-1/2 h-0.5 w-full -translate-y-1/2",
                  completedSteps.includes(step.id + 1)
                    ? "bg-green-500"
                    : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}