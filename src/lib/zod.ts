import { z } from 'zod'

// Step 1: Deposit Form Schema
export const depositFormSchema = z.object({
  investmentCatId: z
    .string()
    .min(1, "Please select an investment category"), // ensures empty string fails
  amount: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Amount must be greater than 0")
  ),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description too long"),
});


// Step 3: Proof Upload Schema
const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export const proofUploadSchema = z.object({
  proofFile: z
    .any()
    .refine((file) => !!file, "Please upload proof of payment")
    .refine(
      (file) => typeof file === "object" && "size" in file,
      "Invalid file"
    )
    .refine(
      (file) => file?.size <= maxFileSize,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => allowedFileTypes.includes(file?.type),
      "Only JPG, PNG, and PDF files are allowed"
    ),
  reference: z.string().optional(),
});



export const withdrawalFormSchema = z.object({
  bankName: z.string().trim().min(1, "Bank name is required"),
  accountHolderName: z.string().trim().min(1, "Bank holder name is required"),
  accountNumber: z
    .string()
    .regex(/^\d{10}$/, "Account number must be 10 digits"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  earlyWithdrawal: z.boolean().default(false),
  reference: z.string().optional(),
});

export const upgradeFormSchema = z.object({
  investorCategoryId: z.string().min(1, "Please select an investment category"),
});


// (Optional but recommended) Export inferred types
export type DepositFormValues = z.infer<typeof depositFormSchema>
export type ProofUploadFormValues = z.infer<typeof proofUploadSchema>
export type WithdrawalFormValues = z.infer<typeof withdrawalFormSchema>
export type UpgradeFormValues = z.infer<typeof upgradeFormSchema>

export const createInvestmentSchema = z.object({
  categoryId: z.string().uuid("Invalid investment category"),
  principalAmount: z.preprocess(
    (val) => Number(val),
    z.number().positive("Principal amount must be greater than 0")
  ),
});


export const InvestmentCategorySchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(3),
  priority: z.number().int().min(0),

  minAmount: z.number().positive(),
  maxAmount: z.number().positive(),

  monthlyRoiRate: z.number().min(0),
  durationMonths: z.number().int().positive(),

  description: z.string().optional(),
}).refine(
  (data) => data.maxAmount >= data.minAmount,
  {
    message: "maxAmount must be greater than or equal to minAmount",
    path: ["maxAmount"],
  }
);
