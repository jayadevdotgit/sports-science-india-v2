import { NextResponse } from "next/server";
import { getAllBookings, normalizeDateStr, normalizeTimeSlot } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await getAllBookings();
    // Return the set of already-booked { date, timeSlot, doctor } triples.
    const slots = bookings
      .filter((b) => b.date && b.timeSlot)
      .map((b) => ({
        date: normalizeDateStr(b.date),
        timeSlot: normalizeTimeSlot(b.timeSlot),
        doctor: b.doctor || "",
      }));
    return NextResponse.json({ slots });
  } catch (error: unknown) {
    console.error("Failed to fetch booked slots:", error);
    return NextResponse.json({ slots: [] });
  }
}

