import cloudinary from "@/lib/cloudinary"
import { UploadApiResponse } from "cloudinary"

type UploadOptions = {
  folder?: string
  publicId?: string
  resourceType?: "image" | "video" | "raw" | "auto"
}

export async function uploadToCloudinaryStream(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<{
  url: string
  secureUrl: string
  publicId: string
  bytes: number
  format: string
}> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder ?? "uploads",
        public_id: options.publicId,
        resource_type: options.resourceType ?? "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"))
          return
        }

        resolve({
          url: result.url,
          secureUrl: result.secure_url,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format,
        })
      }
    )

    uploadStream.end(buffer)
  })
}
