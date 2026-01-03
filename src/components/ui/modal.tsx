"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "./dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  disableClose?: boolean
  disableEscapeKey?: boolean
  disableCloseButton?: boolean
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  closeButtonClassName?: string
  onCloseAttempt?: () => void // Callback when user tries to close but it's disabled
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  disableClose = false,
  disableEscapeKey = false,
  disableCloseButton = false,
  closeButtonClassName,
  onCloseAttempt
}: ModalProps) {
  // Handle dialog open change
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Check if closing should be prevented
      if (disableClose || disableEscapeKey || disableCloseButton) {
        // Call attempt callback if provided
        if (onCloseAttempt) {
          onCloseAttempt();
        }
        return; // Prevent closing
      }
      onClose();
    }
  }

  const handleCloseButtonClick = () => {
    if (disableCloseButton) {
      if (onCloseAttempt) {
        onCloseAttempt();
      }
      return;
    }
    onClose();
  }

  // Determine if any close method is disabled
  const isCloseDisabled = disableClose || disableEscapeKey || disableCloseButton;

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={handleOpenChange}
    >
      <DialogContent 
        className={cn("sm:max-w-[500px] max-h-[80vh] overflow-auto scrollbar-hide", className)}
        // Prevent closing on escape key when disabled
        onEscapeKeyDown={(e) => {
          if (disableEscapeKey) {
            e.preventDefault();
            if (onCloseAttempt) {
              onCloseAttempt();
            }
          }
        }}
        // Prevent closing on interaction outside when disabled
        onInteractOutside={(e) => {
          if (disableClose) {
            e.preventDefault();
            if (onCloseAttempt) {
              onCloseAttempt();
            }
          }
        }}
      >
        {showCloseButton && (
          <button
            onClick={handleCloseButtonClick}
            disabled={disableCloseButton}
            className={cn(
              "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
              disableCloseButton && "cursor-not-allowed opacity-50",
              closeButtonClassName
            )}
            aria-disabled={disableCloseButton}
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
        
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
        )}
        
        {isCloseDisabled && (
          <div 
            className="mb-4 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <p>Form submission in progress. Please wait...</p>
          </div>
        )}
        
        {children}
      </DialogContent>
    </Dialog>
  )
}