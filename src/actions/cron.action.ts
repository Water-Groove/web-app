import { acquireCronLock, releaseCronLock } from "@/services/cron/cron.helper"
import { processRoiPayouts } from "@/services/cron/cron.service"

export async function runRoiCron() {
  const LOCK_NAME = "ROI_CRON"

  const locked = await acquireCronLock(LOCK_NAME)
  if (!locked) {
    console.log("ROI cron already running, skipping...")
    return
  }

  try {
    await processRoiPayouts()
  } finally {
    await releaseCronLock(LOCK_NAME)
  }
}
