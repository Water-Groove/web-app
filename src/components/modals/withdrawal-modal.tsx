"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, AlertCircle, Loader2, Info } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { withdrawalFormSchema, WithdrawalFormValues } from "@/lib/zod";
import {
  WithdrawalActionState,
  withdrawaRequestAction,
} from "@/actions/client.action";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, formatCurrency } from "@/lib/utils";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  principalLocked?: number; // Locked principal amount
  isMature?: boolean;
}

export function WithdrawalModal({
  isOpen,
  onClose,
  availableBalance,
  principalLocked = 0,
  isMature = false,
}: WithdrawalModalProps) {
  const initialState: WithdrawalActionState = {
    success: false,
    error: undefined,
    validationErrors: undefined,
    message: "",
    data: {
      reference: "",
    },
  };
  const [isForm, setIsForm] = useState<boolean>(true);

  const [state, formAction, isPending] = useActionState(
    withdrawaRequestAction,
    initialState
  );

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalFormSchema as any),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      amount: 0,
      earlyWithdrawal: false,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const previousIsOpenRef = useRef(isOpen);

  // Watch form values for calculations
  const amount = form.watch("amount") || 0;
  const earlyWithdrawal = form.watch("earlyWithdrawal") || false;

  // Calculate available withdrawal amounts
  // const withdrawableBalance = availableBalance - principalLocked; // Balance after removing locked principal
  const interestEarned = availableBalance; // Interest earned so far
  
  // Calculate early withdrawal penalty (25% of principal amount withdrawn)
  const earlyWithdrawalPenaltyRate = 0.25;
  
  // Determine how much principal is being withdrawn
  const principalBeingWithdrawn = earlyWithdrawal 
    ? Math.max(0, amount - interestEarned) // Any amount beyond interest is from principal
    : 0;
  
  const earlyWithdrawalPenalty = earlyWithdrawal && principalBeingWithdrawn > 0
    ? amount * earlyWithdrawalPenaltyRate
    : 0;
  
  const netAmountAfterPenalty = amount - earlyWithdrawalPenalty;

  // Calculate max withdrawable amount based on withdrawal type
  const calculateMaxWithdrawableAmount = () => {
    if (earlyWithdrawal) {
      // For early withdrawal: availableBalance only (principal + interest)
      // User can withdraw up to availableBalance with penalty
      return (principalLocked + availableBalance);
    } else {
      // For regular withdrawal: only interest earned (availableBalance - principalLocked)
      // Or if principal is locked, use withdrawableBalance
      return Math.max(0, availableBalance);
    }
  };

  const maxWithdrawableAmount = calculateMaxWithdrawableAmount();
  const MIN_WITHDRAWAL = 10000;

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen && previousIsOpenRef.current) {
      form.reset();
      setIsForm(true);
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen, form]);

  // Handle server validation errors
  useEffect(() => {
    if (state.validationErrors) {
      Object.entries(state.validationErrors).forEach(([field, message]) => {
        if (field in form.getValues()) {
          form.setError(field as keyof WithdrawalFormValues, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        }
      });
    }

    if (state.success) {
      setIsForm(false);
    }
  }, [state, form]);

  // Handle modal close with proper cleanup
  const handleClose = () => {
    form.reset();
    setIsForm(true);
    onClose();
  };

  // Format amount for display
  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Validate amount based on withdrawal type
  const validateAmount = () => {
    if (amount <= 0) return "Enter an amount";
    if (amount < MIN_WITHDRAWAL) return `Minimum withdrawal is ${formatAmount(MIN_WITHDRAWAL)}`;
    if (amount > maxWithdrawableAmount) {
      if (earlyWithdrawal) {
        return `Amount exceeds available balance of ${formatAmount(maxWithdrawableAmount)}`;
      } else {
        return `Maximum withdrawal without penalty is ${formatAmount(maxWithdrawableAmount)}`;
      }
    }
    return undefined;
  };

  const amountError = validateAmount();

  // Handle form submission
  const handleSubmit = async (data: WithdrawalFormValues) => {
    const formData = new FormData();
    formData.append("bankName", data.bankName);
    formData.append("accountHolderName", data.accountHolderName);
    formData.append("accountNumber", data.accountNumber);
    formData.append("amount", data.amount.toString());
    formData.append("earlyWithdrawal", data.earlyWithdrawal.toString());

    return formAction(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Withdraw Funds"
      description="Request withdrawal from your investment account"
      className="w-full max-w-[95%] sm:max-w-[460px] md:max-w-[520px]"
      disableClose={isPending}
      showCloseButton={!isPending}
    >
      <div className="px-1 sm:px-0">
        {isForm ? (
          <>
            {/* Balance Summary */}
            <div className="mb-5 p-4 sm:p-5 bg-gradient-to-r from-wg-primary/10 to-wg-secondary/5 rounded-lg border border-wg-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-wg-primary font-medium">
                    Available Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold break-all text-wg-secondary">
                    {formatAmount(availableBalance)}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {principalLocked > 0 && (
                      <div className="text-xs">
                        <span className="text-wg-primary/70">Principal: </span>
                        <span className="font-medium text-amber-600">{formatCurrency(principalLocked)}</span>
                      </div>
                    )}
                    {interestEarned > 0 && (
                      <div className="text-xs">
                        <span className="text-wg-primary/70">Interest Earned: </span>
                        <span className="font-medium text-green-600">+{formatAmount(interestEarned)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={isMature ? "default" : "outline"} 
                  className={cn(
                    "w-fit",
                    isMature 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  )}
                >
                  {isMature ? "Matured" : "In Progress"}
                </Badge>
              </div>
              
              {/* Withdrawal Limits */}
              <div className="mt-4 pt-4 border-t border-wg-primary/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-wg-primary/70">Withdrawal Type:</span>
                  <span className="font-medium">
                    {earlyWithdrawal ? "Early Withdrawal" : "Regular Withdrawal"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-wg-primary/70">Maximum Withdrawal:</span>
                  <span className="font-bold text-wg-secondary">
                    {formatAmount(maxWithdrawableAmount)}
                  </span>
                </div>
              </div>

              {amount > 0 && (
                <div className="mt-4 pt-4 border-t border-wg-primary/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-wg-primary/70">Requested Amount:</span>
                    <span className="font-medium">{formatAmount(amount)}</span>
                  </div>
                  {earlyWithdrawal && principalBeingWithdrawn > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-wg-primary/70">From Principal:</span>
                        <span className="font-medium">{formatAmount(principalBeingWithdrawn)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-wg-primary/70">Penalty (25%):</span>
                        <span className="font-medium text-red-600">
                          -{formatAmount(earlyWithdrawalPenalty)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-wg-primary/70">Net Amount:</span>
                        <span className="font-medium text-green-600">
                          {formatAmount(netAmountAfterPenalty)}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-wg-primary/70">Remaining Balance:</span>
                    <span className={
                      amount > maxWithdrawableAmount
                        ? "text-red-600"
                        : "text-green-600"
                    }>
                      {formatAmount(Math.max(0, availableBalance - amount))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Server Error Alert */}
            {state.error && !state.validationErrors && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                {/* Early Withdrawal Toggle - Only show if investment is not matured */}
                {!isMature && principalLocked > 0 && (
                  <FormField
                    control={form.control}
                    name="earlyWithdrawal"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-wg-primary font-medium">
                          Withdrawal Type
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            value={field.value ? "true" : "false"}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-wg-primary/20 hover:bg-wg-primary/5 transition-colors">
                              <RadioGroupItem value="false" id="regular" className="text-wg-secondary" />
                              <Label htmlFor="regular" className="cursor-pointer flex-1">
                                <div className="font-medium">Regular Withdrawal</div>
                                <div className="text-sm text-wg-primary/70">
                                  Withdraw interest only (no penalty)
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors">
                              <RadioGroupItem value="true" id="early" className="text-amber-600" />
                              <Label htmlFor="early" className="cursor-pointer flex-1">
                                <div className="font-medium">Early Withdrawal</div>
                                <div className="text-sm text-wg-primary/70">
                                  Withdraw principal + interest (25% penalty on principal)
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Early Withdrawal Warning */}
                {earlyWithdrawal && (
                  <Alert className="bg-gradient-to-r from-amber-50 to-red-50 border border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800 text-sm">
                      <strong className="font-semibold">Early Withdrawal Penalty:</strong> 
                      {" "}25% of the principal amount withdrawn will be deducted.
                      {principalBeingWithdrawn > 0 && (
                        <span className="block mt-1">
                          Penalty on {formatAmount(principalBeingWithdrawn)} principal:{" "}
                          <span className="font-bold text-red-600">{formatAmount(earlyWithdrawalPenalty)}</span>
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Bank Account Details */}
                <div className="space-y-4">
                  <h3 className="text-wg-primary font-medium">Bank Account Details</h3>
                  
                  {/* Account Holder */}
                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-wg-primary">Account Holder Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter account holder name as it appears on bank statement"
                            {...field}
                            disabled={isPending}
                            className="bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bank Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-wg-primary">Bank Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Zenith Bank"
                              {...field}
                              disabled={isPending}
                              className="bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-wg-primary">Account Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10-digit number"
                              inputMode="numeric"
                              maxLength={10}
                              pattern="[0-9]*"
                              {...field}
                              disabled={isPending}
                              className="bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20"
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-wg-primary">Amount (₦)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            inputMode="decimal"
                            placeholder="Enter withdrawal amount"
                            {...field}
                            disabled={isPending}
                            className="bg-white border-wg-primary/20 focus:border-wg-secondary focus:ring-wg-secondary/20 pl-8"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                            min={MIN_WITHDRAWAL}
                            max={maxWithdrawableAmount}
                            step="1000"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-wg-primary/60 font-medium">
                            ₦
                          </div>
                        </div>
                      </FormControl>
                      <div className="flex justify-between mt-1">
                        <FormMessage className="text-red-600">
                          {form.formState.errors.amount?.message || amountError}
                        </FormMessage>
                        <div className="text-xs text-wg-primary/60">
                          Max: {formatAmount(maxWithdrawableAmount)}
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <Separator className="border-wg-primary/10" />

                {/* Info Alert */}
                <Alert className="bg-wg-primary/5 border-wg-primary/20">
                  <Info className="h-4 w-4 text-wg-primary" />
                  <AlertDescription className="text-wg-primary text-sm">
                    <strong>Processing Time:</strong>{" "}
                    {earlyWithdrawal 
                      ? "Early withdrawals are processed within 5-7 business days."
                      : "Regular withdrawals are processed within 24–72 hours."
                    }
                    <span className="block mt-1">
                      <strong>Minimum Withdrawal:</strong> {formatAmount(MIN_WITHDRAWAL)}
                    </span>
                  </AlertDescription>
                </Alert>

                {/* Summary Card */}
                {amount > 0 && (
                  <div className="p-4 bg-gradient-to-r from-wg-secondary/5 to-wg-primary/5 rounded-lg border border-wg-primary/20">
                    <h4 className="font-medium text-wg-primary mb-2">Withdrawal Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-wg-primary/70">Requested Amount:</span>
                        <span className="font-medium">{formatAmount(amount)}</span>
                      </div>
                      {earlyWithdrawal && principalBeingWithdrawn > 0 && (
                        <div className="flex justify-between">
                          <span className="text-wg-primary/70">Penalty (25%):</span>
                          <span className="font-medium text-red-600">
                            -{formatAmount(earlyWithdrawalPenalty)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-wg-primary/10 font-bold">
                        <span className="text-wg-primary">You'll Receive:</span>
                        <span className="text-green-600">
                          {formatAmount(netAmountAfterPenalty)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

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
                    disabled={
                      isPending ||
                      !!amountError ||
                      amount < MIN_WITHDRAWAL
                    }
                    className="flex-1 min-h-[40px] bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Request Withdrawal"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center border-4 border-green-200">
              <Check className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-wg-primary">
                Withdrawal Request Sent
              </h3>
              <p className="text-wg-primary/70 mt-2 text-sm sm:text-base">
                {state.message ||
                  "Your request has been submitted successfully. Funds will be transferred within 24–72 hours."}
              </p>
            </div>

            <div className="space-y-3 p-4 bg-gradient-to-r from-wg-primary/5 to-wg-secondary/5 rounded-lg border border-wg-primary/20 text-left">
              <div className="flex justify-between">
                <span className="text-wg-primary/70">Reference:</span>
                <span className="font-medium text-wg-primary">{state.data?.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-wg-primary/70">Amount:</span>
                <span className="font-medium">{formatAmount(amount)}</span>
              </div>
              {earlyWithdrawal && (
                <div className="flex justify-between">
                  <span className="text-wg-primary/70">Type:</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                    Early Withdrawal
                  </Badge>
                </div>
              )}
              {earlyWithdrawal && earlyWithdrawalPenalty > 0 && (
                <div className="flex justify-between">
                  <span className="text-wg-primary/70">Penalty Deducted:</span>
                  <span className="font-medium text-red-600">
                    -{formatAmount(earlyWithdrawalPenalty)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-wg-primary/10 mt-2 font-bold">
                <span className="text-wg-primary">Net Amount:</span>
                <span className="text-green-600">
                  {formatAmount(netAmountAfterPenalty)}
                </span>
              </div>
            </div>

            <p className="text-sm text-wg-primary/60">
              You'll receive a confirmation email shortly
            </p>

            <div className="pt-4">
              <Button 
                onClick={handleClose} 
                className="w-full bg-gradient-to-r from-wg-primary to-wg-secondary hover:from-wg-primary/90 hover:to-wg-secondary/90 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}