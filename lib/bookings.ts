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
