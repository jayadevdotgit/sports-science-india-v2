import { promises as fs } from "fs";
import path from "path";

export type BookingRecord = {
  bookingCode: string;
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
