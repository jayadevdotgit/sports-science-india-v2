import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { fetchDoctorConfigFromSheet, saveDoctorConfigToSheet } from "@/lib/sheets";
import { defaultDoctorConfigs, type DoctorConfig } from "@/lib/booking-config";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let config: DoctorConfig[] = [];
    try {
      config = await fetchDoctorConfigFromSheet();
    } catch (error: unknown) {
      console.error("Config read failed:", error);
    }
    // If the Config tab has no data yet, return sensible defaults.
    const doctors = config.length > 0 ? config : defaultDoctorConfigs();
    return NextResponse.json({ config: doctors });
  } catch (error: unknown) {
    console.error("Admin config error:", error);
    return NextResponse.json({ error: "Failed to load config." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { config?: unknown };
    const config = body.config;
    if (!Array.isArray(config)) {
      return NextResponse.json({ error: "Invalid config payload." }, { status: 400 });
    }
    await saveDoctorConfigToSheet(
      config.map((c) => ({
        name: String((c as { name?: unknown }).name ?? ""),
        available: Boolean((c as { available?: unknown }).available),
        start: String((c as { start?: unknown }).start ?? ""),
        end: String((c as { end?: unknown }).end ?? ""),
      }))
    );
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Admin config save error:", error);
    return NextResponse.json({ error: "Failed to save config." }, { status: 500 });
  }
}
