"use server";

import { depositFormSchema, proofUploadSchema, withdrawalFormSchema } from "@/lib/zod";
import { BankDetails, CreateDeposit, WithdrawalRequestDto } from "@/types/type";
import { uploadFileAction } from "./upload.action";
import { createDepositService, uploadDepositProofService, withdrawalRequestService } from "@/services/client/cud.service";
import { z } from 'zod'

export type DepositActionState = {
  success: boolean;          // always set
  error?: string;            // optional
  bankDetails?: BankDetails; // optional
};


export type UploadProofActionState = {
  success: boolean;
  error?: string;
  data?: {
    reference: string
  }
};

export type WithdrawalActionState = {
  success: boolean;
  error?: string;
  validationErrors?: Partial<Record<keyof z.infer<typeof withdrawalFormSchema>, string[]>>;
  message?: string;
  data?: {
    reference: string
    penaltyAmount?: number;
    netAmount?: number;
  }
};


export async function createDeposit(
  _prevState: DepositActionState,
  formData: FormData
): Promise<DepositActionState> {
  const rawData: CreateDeposit = {
    investmentCatId: formData.get("investmentCatId") as string,
    amount: Number(formData.get("amount")),
    description: formData.get("description") as string,
  };


  const parsed = depositFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed?.error.message ?? "Invalid form data",
    };
  }

  try {
    // simulate async work
    const res = await createDepositService({ ...rawData })

    console.log(res)

    if (!res.success && !res.data) {
      return {
        success: false,
        bankDetails: undefined,
        error: res.message || "Failed to initiate transaction"
      };
    }

    return {
      success: true,
      bankDetails: res.data ? { ...res.data } : undefined
    };

  } catch (err) {
    console.log(err)
    // ✅ unexpected failure
    return {
      success: false,
      error: "Failed to create deposit. Please try again.",
    };
  }
}

export async function createProofUpload(
  _prevState: UploadProofActionState,
  formData: FormData
): Promise<UploadProofActionState> {
  const rawData = {
    proofFile: formData.get("proofFile"),
    reference: formData.get("reference") ? String(formData.get("reference")) : ""
  };

  // Validate the data with schema
  const parsed = proofUploadSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid proof data. Please ensure all required fields are filled correctly."
    };
  }

  // Upload the file
  const res = await uploadFileAction(formData);
  console.log('Upload response: ', res);

  if (!res.success || !res.proofUrl) {
    return {
      success: false,
      error: res.message || "File upload failed. Please try again or check your file format/size."
    };
  }

  const data = {
    proofUrl: res.proofUrl,
    reference: rawData.reference
  };

  // Simulate saving to DB or API
  const result = await uploadDepositProofService(data.proofUrl)

  if (!result) {
    return {
      success: false,
      error: "Failed to save uploaded proof url."
    };
  }

  return {
    success: true,
    data: {
      // proofFile: data.proofUrl,
      reference: data.reference
    }
  };
}

export async function withdrawaRequestAction(
  _prevState: WithdrawalActionState,
  formData: FormData
): Promise<WithdrawalActionState> {
  const rawData: WithdrawalRequestDto = {
    bankName: formData.get("bankName") as string,
    accountHolderName: formData.get("accountHolderName") as string,
    accountNumber: formData.get("accountNumber") as string,
    amount: Number(formData.get("amount")) as number,
    earlyWithdrawal: Boolean(formData.get('earlyWithdrawal'))
  };

  // Validate the data with schema
  const parsed = withdrawalFormSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid withdrawal request data."
    };
  }
  // Simulate saving to DB or API
  const result = await withdrawalRequestService({ ...rawData })

  if (!result.success) {
    return {
      success: false,
      error: result.message || "Failed to save uploaded proof url."
    };
  }

  return {
    success: true,
    message: result.message || "Withdrawal request successfully"
  };
}