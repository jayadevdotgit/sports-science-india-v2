import { NextResponse } from "next/server";
import { getAllBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await getAllBookings();
    // Return the set of already-booked { date, timeSlot } pairs.
    const slots = bookings
      .filter((b) => b.date && b.timeSlot)
      .map((b) => ({ date: b.date, timeSlot: b.timeSlot }));
    return NextResponse.json({ slots });
  } catch (error: unknown) {
    console.error("Failed to fetch booked slots:", error);
    return NextResponse.json({ slots: [] });
  }
}
