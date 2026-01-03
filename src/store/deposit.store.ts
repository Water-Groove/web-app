import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BankDetails } from '@/types/type';

export interface DepositStepState {
  // Step management only
  currentStep: number;
  completedSteps: number[];

  // Minimal bank details for better UX (only store what's needed for display)
  bankDetails?: BankDetails;

  // Actions
  setCurrentStep: (step: number) => void;
  setCompletedSteps: (steps: number[]) => void;
  addCompletedStep: (step: number) => void;
  setBankDetails: (bankDetails: BankDetails) => void;
  clearBankDetails: () => void;

  // Reset
  reset: () => void;

  // Check if there's unsaved progress
  hasUnsavedProgress: () => boolean;
}

export const useDepositStepStore = create<DepositStepState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      completedSteps: [],
      bankDetails: undefined,

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      setCompletedSteps: (steps) => set({ completedSteps: steps }),

      addCompletedStep: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])]
        })),

      setBankDetails: (bankDetails: BankDetails) => set({ bankDetails }),

      clearBankDetails: () => set({ bankDetails: undefined }),

      reset: () => set({
        currentStep: 1,
        completedSteps: [],
        bankDetails: undefined,
      }),

      hasUnsavedProgress: () => {
        const state = get();
        return Boolean(
          state.completedSteps.length > 0 || 
          (state.bankDetails && state.bankDetails.reference)
        );
      },

      // Optional: Helper to get only reference
      getBankReference: () => {
        const state = get();
        return state.bankDetails?.reference;
      },
    }),
    {
      name: 'deposit-step-store',
      version: 1,
      // Partialize to only persist specific fields
      partialize: (state) => ({
        currentStep: state.currentStep,
        completedSteps: state.completedSteps,
        bankDetails: state.bankDetails,
      }),
    }
  )
);