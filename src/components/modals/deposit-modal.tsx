"use client";

import {
  useActionState,
  useEffect,
  useState,
  useRef,
  useCallback,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Copy, Check, AlertCircle, X, Info, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { Modal } from "@/components/ui/modal";
import { FormStepProgress } from "@/components/forms/form-step-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BankDetails, CategoryDto } from "@/types/type";
import {
  depositFormSchema,
  DepositFormValues,
  ProofUploadFormValues,
  proofUploadSchema,
} from "@/lib/zod";
import {
  createDeposit,
  createProofUpload,
  DepositActionState,
  UploadProofActionState,
} from "@/actions/client.action";
import { useDepositStepStore } from "@/store/deposit.store";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  investmentCategories: CategoryDto[];
  availableBalance?: number;
}

interface FormState {
  error?: string;
  success?: boolean;
  bankDetails?: BankDetails;
}

export function DepositModal({
  isOpen,
  onClose,
  investmentCategories,
  availableBalance = 0,
}: DepositModalProps) {
  // Zustand store for step persistence only
  const {
    currentStep,
    completedSteps,
    bankDetails: storedBankDetails,
    setCurrentStep,
    setCompletedSteps,
    addCompletedStep,
    setBankDetails,
    reset,
    hasUnsavedProgress,
  } = useDepositStepStore();

  // Local state for form data (not persisted)
  const [depositData, setDepositData] = useState<DepositFormValues | null>(
    null
  );
  const [localBankDetails, setLocalBankDetails] = useState<BankDetails | null>(
    storedBankDetails || null
  );
  const [proofFile, setProofFile] = useState<File | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showUnsavedChangesAlert, setShowUnsavedChangesAlert] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const initialState: DepositActionState = {
    success: false,
    error: undefined,
    bankDetails: undefined,
  };

  const proofInitialState: UploadProofActionState = {
    success: false,
    error: undefined,
    data: {
      reference: "",
    },
  };

  const [state, formAction, isPending] = useActionState(
    createDeposit,
    initialState
  );
  const [proofState, proofFormAction, isProofPending] = useActionState(
    createProofUpload,
    proofInitialState
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format amount for display
  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Initialize forms
  const depositForm = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema as any),
    defaultValues: {
      investmentCatId: "",
      amount: 0,
      description: "",
    },
  });

  const proofForm = useForm<ProofUploadFormValues>({
    resolver: zodResolver(proofUploadSchema as any),
    defaultValues: {
      proofFile: undefined,
    },
  });

  // Sync local state with store on mount
  useEffect(() => {
    if (storedBankDetails) {
      setLocalBankDetails(storedBankDetails);
    }
  }, [storedBankDetails]);

  // Handle server response for bank details
  useEffect(() => {
    if (state.success && state.bankDetails) {
      setLocalBankDetails(state.bankDetails);
      setBankDetails(state.bankDetails); // Persist to store
      setCompletedSteps([1]);
      setCurrentStep(2);
    }
  }, [state, setBankDetails, setCompletedSteps, setCurrentStep]);

  // Handle server response for proof upload
  useEffect(() => {
    if (proofState.success) {
      setCompletedSteps([1, 2, 3]);
      setCurrentStep(4);
    }
  }, [proofState, setCompletedSteps, setCurrentStep]);

  // Display error in a toast/alert
  useEffect(() => {
    if (state.error || proofState.error) {
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.error, proofState.error]);

  // Warn user about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isOpen && hasUnsavedProgress() && currentStep < 4) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved deposit progress. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOpen, hasUnsavedProgress, currentStep]);

  const steps = [
    { id: 1, label: "Deposit Details", description: "Enter deposit information" },
    { id: 2, label: "Make Payment", description: "Transfer funds to bank account" },
    { id: 3, label: "Upload Proof", description: "Upload payment receipt" },
    { id: 4, label: "Confirmation", description: "Awaiting verification" },
  ];

  const handleDepositSubmit = (data: DepositFormValues) => {
    setDepositData(data);

    const formData = new FormData();
    formData.append("investmentCatId", data.investmentCatId);
    formData.append("amount", String(data.amount));
    formData.append("description", data.description);

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleProofSubmit = async (data: ProofUploadFormValues) => {
    if (!data.proofFile || !localBankDetails?.reference) {
      return;
    }

    const formData = new FormData();
    formData.append("proofFile", data.proofFile);
    formData.append("reference", localBankDetails.reference);

    startTransition(() => {
      proofFormAction(formData);
    });
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClose = useCallback(() => {
    if (currentStep < 4 && hasUnsavedProgress()) {
      setShowUnsavedChangesAlert(true);
    } else {
      performClose();
    }
  }, [currentStep, hasUnsavedProgress]);

  const performClose = useCallback(() => {
    setIsClosing(true);

    // Only reset if process is complete
    if (currentStep === 4) {
      reset();
      setDepositData(null);
      setLocalBankDetails(null);
      setProofFile(null);
    }

    setShowUnsavedChangesAlert(false);
    depositForm.reset();
    proofForm.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [currentStep, reset, depositForm, proofForm, onClose]);

  const handleBackToForm = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const validateFile = (file: File): string | null => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      return "File type not supported. Please upload JPG, PNG, or PDF.";
    }

    if (file.size > maxSize) {
      return "File size exceeds 5MB limit.";
    }

    return null;
  };

  const resetModal = () => {
    reset();
    setDepositData(null);
    setLocalBankDetails(null);
    setProofFile(null);
    setCurrentStep(1);
    depositForm.reset();
    proofForm.reset();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Make a Deposit"
        description="Fund your investment account in 3 simple steps"
        className="w-full max-w-[95%] sm:max-w-[500px] md:max-w-[580px]"
        disableClose={hasUnsavedProgress() && currentStep < 4}
        showCloseButton={!hasUnsavedProgress() || currentStep === 4}
      >
        <div className="px-1 sm:px-0">
          {/* Balance Summary */}
          {availableBalance > 0 && (
            <div className="mb-5 p-4 sm:p-5 bg-gradient-to-r from-wg-primary/10 to-wg-secondary/5 rounded-lg border border-wg-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-wg-primary font-medium">
                    Current Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-wg-secondary">
                    {formatAmount(availableBalance)}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className="border-wg-primary/30 text-wg-primary bg-white"
                >
                  Available
                </Badge>
              </div>
            </div>
          )}

          {/* Global Error Display */}
          {(state?.error || proofState.error) && (
            <Alert
              variant="destructive"
              className="mb-4 animate-in slide-in-from-top duration-300"
            >
              <X className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {state.error || proofState.error}
              </AlertDescription>
            </Alert>
          )}

          {/* Progress Saved Alert */}
          {completedSteps.length > 0 && currentStep < 4 && !state?.error && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 text-sm">
                Your progress is saved. You can safely close this window and return later.
              </AlertDescription>
            </Alert>
          )}

          {/* Policy Alert */}
          <Alert className="mb-5 bg-wg-primary/5 border-wg-primary/20">
            <Info className="h-4 w-4 text-wg-primary" />
            <AlertDescription className="text-wg-primary text-sm leading-relaxed">
              <strong className="font-semibold">Important:</strong>{" "}
              Ensure all deposit details are accurate. Deposits are processed within 24–48 hours.
              <span className="block mt-1">
                <strong>Minimum Deposit:</strong> ₦100,000
              </span>
            </AlertDescription>
          </Alert>

          {/* Step Progress */}
          <FormStepProgress
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            className="mb-6"
          />

          {/* STEP 1: Deposit Form */}
          {currentStep === 1 && (
            <Form {...depositForm}>
              <form
                onSubmit={depositForm.handleSubmit(handleDepositSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Investment Category */}
                <FormField
                  control={depositForm.control}
                  name="investmentCatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-wg-primary font-medium">Investment Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20">
                            <SelectValue placeholder="Select investment category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-wg-primary/20">
                          {investmentCategories.map((investment) => (
                            <SelectItem
                              key={investment.id}
                              value={investment?.code}
                              className="focus:bg-wg-primary/5"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium text-wg-primary">
                                  {investment.name}
                                </span>
                                <span className="text-xs text-wg-primary/70 truncate">
                                  {investment.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={depositForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-wg-primary font-medium">Amount (₦)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            inputMode="numeric"
                            min="100000"
                            step="1000"
                            disabled={isPending}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                            className="bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20 pl-8"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-wg-primary/60 font-medium">
                            ₦
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-wg-primary/70">
                        Minimum deposit: ₦100,000
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={depositForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-wg-primary font-medium">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter deposit purpose or reference"
                          className="resize-none min-h-[90px] bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-wg-primary/70">
                        Add notes or reference for this deposit
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 min-h-[40px] bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Continue to Payment"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* STEP 2: Bank Details */}
          {currentStep === 2 && localBankDetails && (
            <div className="space-y-6">
              <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 text-sm">
                  Transfer the exact amount using the reference below. Your progress is saved.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Bank Name",
                      value: localBankDetails.bankName,
                      key: "bankName",
                    },
                    {
                      label: "Account Number",
                      value: localBankDetails.accountNumber,
                      key: "accountNumber",
                    },
                  ].map((item) => (
                    <div key={item.key} className="space-y-1">
                      <label className="text-sm font-medium text-wg-primary">
                        {item.label}
                      </label>
                      <div className="flex items-center justify-between gap-3 p-3 border border-wg-primary/20 rounded-lg bg-wg-primary/5">
                        <span className="truncate font-medium text-sm text-wg-primary">
                          {item.value}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleCopyToClipboard(item.value, item.key)
                          }
                          className="shrink-0 hover:bg-wg-primary/10"
                        >
                          {copiedField === item.key ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-wg-primary" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Account Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-wg-primary">Account Name</label>
                  <div className="flex items-center justify-between gap-3 p-3 border border-wg-primary/20 rounded-lg bg-wg-primary/5">
                    <span className="truncate font-medium text-sm text-wg-primary">
                      {localBankDetails.accountHolderName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          localBankDetails.accountHolderName,
                          "accountHolderName"
                        )
                      }
                      className="shrink-0 hover:bg-wg-primary/10"
                    >
                      {copiedField === "accountHolderName" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-wg-primary" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Reference */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-wg-primary">Reference</label>
                  <div className="flex items-center justify-between gap-3 p-3 border border-wg-secondary/30 rounded-lg bg-gradient-to-r from-wg-secondary/5 to-wg-primary/5">
                    <span className="font-mono text-sm truncate text-wg-secondary">
                      {localBankDetails.reference}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopyToClipboard(
                          localBankDetails.reference ? localBankDetails?.reference : '',
                          "reference"
                        )
                      }
                      className="shrink-0 hover:bg-wg-secondary/10"
                    >
                      {copiedField === "reference" ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-wg-secondary" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-wg-primary/70 mt-2">
                    <Info className="h-3 w-3 inline mr-1" />
                    Include this reference in your transfer. Required for verification.
                  </p>
                </div>
              </div>

              <Separator className="border-wg-primary/10" />

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={handleBackToForm}
                  className="flex-1 border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    addCompletedStep(2);
                    setCurrentStep(3);
                  }}
                >
                  I've Sent Payment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Upload Proof */}
          {currentStep === 3 && (
            <Form {...proofForm}>
              <form
                onSubmit={proofForm.handleSubmit(handleProofSubmit)}
                className="space-y-6"
                noValidate
              >
                <FormField
                  control={proofForm.control}
                  name="proofFile"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-wg-primary font-medium">Proof of Payment</FormLabel>
                      <div 
                        onClick={() => !isProofPending && fileInputRef.current?.click()}
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all",
                          "border-wg-primary/20 hover:border-wg-secondary hover:bg-wg-primary/5",
                          isProofPending && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Upload className="h-10 w-10 text-wg-primary/50 mx-auto mb-4" />
                        <p className="text-sm font-medium text-wg-primary mb-2">
                          Upload your transfer receipt
                        </p>
                        <p className="text-xs text-wg-primary/60 mb-4">
                          Supported: JPG, PNG, PDF (Max 5MB)
                        </p>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            if (file) {
                              const error = validateFile(file);
                              if (error) {
                                proofForm.setError("proofFile", {
                                  message: error,
                                });
                                return;
                              }
                              onChange(file);
                              proofForm.clearErrors("proofFile");
                            } else {
                              onChange(null);
                            }
                          }}
                          className="hidden"
                          disabled={isProofPending}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
                          disabled={isProofPending}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                      </div>
                      {value && (
                        <div className="mt-4 p-3 border border-wg-primary/20 rounded-lg flex items-center justify-between bg-gradient-to-r from-wg-primary/5 to-transparent">
                          <div className="truncate">
                            <p className="text-sm font-medium text-wg-primary truncate">
                              {value.name}
                            </p>
                            <p className="text-xs text-wg-primary/60">
                              {(value.size / 1024).toFixed(2)} KB •{" "}
                              {value.type.split("/")[1].toUpperCase()}
                            </p>
                          </div>
                          <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                            Ready to Upload
                          </Badge>
                        </div>
                      )}
                      <FormDescription className="text-wg-primary/70">
                        Upload a clear screenshot or PDF of your bank transfer receipt.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToForm}
                    className="flex-1 border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
                    disabled={isProofPending}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!proofForm.watch("proofFile") || isProofPending}
                    className="flex-1 bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isProofPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Submit Proof"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* STEP 4: Pending Confirmation */}
          {currentStep === 4 && (
            <div className="text-center py-6 sm:py-8 space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center border-4 border-green-200">
                <Check className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-wg-primary">
                  Deposit Request Submitted
                </h3>
                <p className="text-wg-primary/70 mt-2 text-sm sm:text-base">
                  Your deposit is pending confirmation. We'll notify you once it's processed.
                </p>
              </div>

              <div className="space-y-3 p-4 bg-gradient-to-r from-wg-primary/5 to-wg-secondary/5 rounded-lg border border-wg-primary/20 text-left">
                <div className="flex justify-between">
                  <span className="text-wg-primary/70">Reference:</span>
                  <span className="font-medium text-wg-primary font-mono">
                    {localBankDetails?.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wg-primary/70">Amount:</span>
                  <span className="font-medium">
                    {formatAmount(depositData?.amount || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-wg-primary/70">Status:</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                    Pending Verification
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-wg-primary/60">
                You'll receive a confirmation email shortly
              </p>

              <div className="pt-6 space-y-3">
                <Button
                  onClick={performClose}
                  className="w-full bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white"
                  disabled={isProofPending}
                >
                  {isProofPending ? "Closing..." : "Close"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetModal}
                  className="w-full border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
                >
                  Start New Deposit
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Unsaved Changes Alert */}
      {showUnsavedChangesAlert && (
        <Modal
          isOpen={showUnsavedChangesAlert}
          onClose={() => setShowUnsavedChangesAlert(false)}
          title="Unsaved Progress"
          description="You have unsaved deposit progress. What would you like to do?"
          className="max-w-md"
        >
          <div className="space-y-4 py-4">
            <p className="text-sm text-wg-primary/70">
              Your deposit progress is saved locally. You can continue later or discard it now.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={() => setShowUnsavedChangesAlert(false)}
                variant="outline"
                className="border-wg-primary/30 text-wg-primary hover:bg-wg-primary/5 hover:border-wg-primary/50"
              >
                Continue Deposit
              </Button>
              <Button
                onClick={() => {
                  reset();
                  performClose();
                }}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Discard & Close
              </Button>
              <Button 
                onClick={performClose}
                className="bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white"
              >
                Save & Close (Keep Progress)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}