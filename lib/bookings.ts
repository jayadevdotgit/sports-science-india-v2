import { promises as fs } from "fs";
import path from "path";

export type BookingRecord = {
  bookingCode: string;
  doctor?: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  date: string;
  timeSlot: string;
  sport: string;
  notes: string;
  submittedAt: string;
};

const STORE_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "bookings.json");

export async function readBookings(): Promise<BookingRecord[]> {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function appendBooking(record: BookingRecord): Promise<void> {
  const bookings = await readBookings();
  bookings.push(record);
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export function normalizeDoctorName(doc: string | undefined): string {
  if (!doc) return "";
  return doc
    .trim()
    .toLowerCase()
    .replace(/^dr\.?\s*/i, "")
    .replace(/\s+/g, " ");
}

export function normalizeDateStr(dStr: string | undefined): string {
  if (!dStr) return "";
  const trimmed = dStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const d = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return trimmed;
}

export function normalizeTimeSlot(slotStr: string | undefined): string {
  if (!slotStr) return "";
  let s = slotStr.trim();
  if (s.includes("-")) s = s.split("-")[0].trim();
  if (s.includes("–")) s = s.split("–")[0].trim();
  const match = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return s;
  let h = Number(match[1]);
  const min = match[2];
  const meridiem = (match[3] || "AM").toUpperCase();
  return `${String(h).padStart(2, "0")}:${min} ${meridiem}`;
}

/**
 * Reads bookings preferring Google Sheets (production-safe) with a local JSON fallback.
 */
export async function getAllBookings(): Promise<BookingRecord[]> {
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const { fetchBookingsFromSheet } = await import("@/lib/sheets");
      return await fetchBookingsFromSheet();
    } catch (error: unknown) {
      console.error("Sheets read failed, falling back to local store:", error);
    }
  }
  return readBookings();
}

