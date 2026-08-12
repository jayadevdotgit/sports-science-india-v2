import { NextResponse } from "next/server";
import { fetchDoctorConfigFromSheet } from "@/lib/sheets";
import { defaultDoctorConfigs, type DoctorConfig } from "@/lib/booking-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let config: DoctorConfig[] = [];
    try {
      config = await fetchDoctorConfigFromSheet();
    } catch (error: unknown) {
      console.error("Booking config read failed:", error);
    }
    const doctors = config.length > 0 ? config : defaultDoctorConfigs();
    return NextResponse.json({ config: doctors });
  } catch (error: unknown) {
    console.error("Booking config error:", error);
    return NextResponse.json({ config: defaultDoctorConfigs() });
  }
}
