import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",

        // Sizing
        "h-9 md:text-sm",

        // Focus & outline
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",

        // Invalid / error state
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        // Dark mode
        "dark:bg-input/30",

        className
      )}
      {...props}
    />
  )
}

export { Input }
