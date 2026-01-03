import { runRoiCron } from "@/actions/cron.action"

export async function GET() {
  await runRoiCron()
  return Response.json({ success: true })
}
