"use server"

import { uploadToCloudinaryStream } from "@/services/upload.service"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
]

type UploadResponse =
  | { success: true; message: string; proofUrl: string }
  | { success: false; message: string; proofUrl: null }

export async function uploadFileAction(
  formData: FormData
): Promise<UploadResponse> {
  try {
    const file = formData.get("proofFile")

    if (!(file instanceof File)) {
      return {
        success: false,
        message: "Invalid file input",
        proofUrl: null,
      }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        message: "Unsupported file type",
        proofUrl: null,
      }
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: "File too large (max 5MB)",
        proofUrl: null,
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const upload = await uploadToCloudinaryStream(buffer, {
      folder: "water-groove/proofs",
      resourceType: "auto",
    })

    return {
      success: true,
      message: "File uploaded successfully",
      proofUrl: upload.secureUrl,
    }
  } catch (error) {
    console.error("[UPLOAD_FILE_ACTION_ERROR]", error)

    return {
      success: false,
      message: "Failed to upload file",
      proofUrl: null,
    }
  }
}
