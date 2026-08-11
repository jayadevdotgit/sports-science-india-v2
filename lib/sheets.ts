import type { BookingRecord } from "./bookings";

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const SHEETS_TOKEN = process.env.GOOGLE_SHEETS_TOKEN;

/**
 * Appends a booking row to the Google Sheet via the Apps Script web app.
 * Falls back is handled by the caller.
 */
export async function appendBookingToSheet(record: BookingRecord): Promise<void> {
  if (!WEBHOOK_URL) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
  const url = `${WEBHOOK_URL}?key=${encodeURIComponent(SHEETS_TOKEN || "")}`;
  // text/plain avoids CORS preflight; Apps Script reads e.postData.contents regardless.
  const res = await fetch(url, {
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
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Sheets read failed (${res.status})`);
  const data = (await res.json()) as { ok?: boolean; data?: Record<string, string>[] };
  if (!Array.isArray(data?.data)) return [];

  const keyMap: Record<string, keyof BookingRecord> = {
    "Booking Code": "bookingCode",
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
