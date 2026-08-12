import type { BookingRecord } from "./bookings";
import type { DoctorConfig } from "./booking-config";

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SHEETS_TOKEN = process.env.GOOGLE_SHEETS_TOKEN;

// Apps Script web apps are slow on cold start; cap each request so the UI never hangs.
const REQUEST_TIMEOUT_MS = 45000;

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Reads per-doctor availability config from the Config tab.
 * Falls back is handled by the caller.
 */
export async function fetchDoctorConfigFromSheet(): Promise<DoctorConfig[]> {
  if (!WEBHOOK_URL) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  const url = `${WEBHOOK_URL}?action=config&key=${encodeURIComponent(SHEETS_TOKEN || "")}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`Google Sheets config read failed (${res.status})`);
  const data = (await res.json()) as {
    ok?: boolean;
    data?: Record<string, string>[];
  };
  if (!Array.isArray(data?.data)) return [];

  return data.data
    .map((row) => ({
      name: row.Doctor ?? "",
      available: (row.Available ?? "").toLowerCase() === "yes",
      start: normalizeTime(row["Start Time"]),
      end: normalizeTime(row["End Time"]),
    }))
    .filter((c) => c.name);
}

// Google Sheets may return "04:00 PM" as a Date string like
// "Sat Dec 30 1899 16:00:00 GMT+0521 (India Standard Time)". Convert to "HH:MM AM/PM".
function normalizeTime(value: string | undefined): string {
  if (!value) return "";
  const m = value.match(/\b(\d{1,2}):(\d{2}):(\d{2})\b/);
  if (!m) return value;
  let h = Number(m[1]);
  const min = m[2];
  const meridiem = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${String(h).padStart(2, "0")}:${min} ${meridiem}`;
}

/**
 * Writes per-doctor availability config to the Config tab.
 */
export async function saveDoctorConfigToSheet(doctors: DoctorConfig[]): Promise<void> {
  if (!WEBHOOK_URL) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  const url = `${WEBHOOK_URL}?key=${encodeURIComponent(SHEETS_TOKEN || "")}`;
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action: "config", doctors }),
  });
  if (!res.ok) throw new Error(`Google Sheets config save failed (${res.status})`);
}

/**
 * Appends a booking row to the Google Sheet via the Apps Script web app.
 * Falls back is handled by the caller.
 */
export async function appendBookingToSheet(record: BookingRecord): Promise<void> {
  if (!WEBHOOK_URL) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  const url = `${WEBHOOK_URL}?key=${encodeURIComponent(SHEETS_TOKEN || "")}`;
  // text/plain avoids CORS preflight; Apps Script reads e.postData.contents regardless.
  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error(`Google Sheets append failed (${res.status})`);
}

/**
 * Reads all booking rows from the Google Sheet via the Apps Script web app.
 */
export async function fetchBookingsFromSheet(): Promise<BookingRecord[]> {
  if (!WEBHOOK_URL) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  const url = `${WEBHOOK_URL}?action=read&key=${encodeURIComponent(SHEETS_TOKEN || "")}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`Google Sheets read failed (${res.status})`);
  const data = (await res.json()) as { ok?: boolean; data?: Record<string, string>[] };
  if (!Array.isArray(data?.data)) return [];

  const keyMap: Record<string, keyof BookingRecord> = {
    "Booking Code": "bookingCode",
    Doctor: "doctor",
    Name: "name",
    Email: "email",
    Phone: "phone",
    Services: "services",
    Date: "date",
    "Time Slot": "timeSlot",
    Sport: "sport",
    Notes: "notes",
    "Submitted At": "submittedAt",
  };

  return data.data
    .filter((row) => row["Booking Code"])
    .map((row) => {
      const out = {} as BookingRecord;
      for (const [label, key] of Object.entries(keyMap)) {
        out[key] = row[label] ?? "";
      }
      return out;
    });
}
