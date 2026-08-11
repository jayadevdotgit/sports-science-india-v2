import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ExcelJS from "exceljs";
import { readBookings } from "@/lib/bookings";
import { fetchBookingsFromSheet } from "@/lib/sheets";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in as admin." },
      { status: 401 }
    );
  }

  try {
    // Prefer Google Sheets (persists on serverless); fall back to local JSON.
    let bookings;
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        bookings = await fetchBookingsFromSheet();
      } catch (sheetError: unknown) {
        console.error("Sheets read failed, falling back to local store:", sheetError);
        bookings = await readBookings();
      }
    } else {
      bookings = await readBookings();
    }

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Sports Science India";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Bookings");

    sheet.columns = [
      { header: "Booking Code", key: "bookingCode", width: 18 },
      { header: "Name", key: "name", width: 22 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "Services", key: "services", width: 35 },
      { header: "Date", key: "date", width: 14 },
      { header: "Time Slot", key: "timeSlot", width: 12 },
      { header: "Sport", key: "sport", width: 20 },
      { header: "Notes", key: "notes", width: 40 },
      { header: "Submitted At", key: "submittedAt", width: 24 },
    ];

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEA580C" },
    };
    headerRow.height = 22;

    bookings.forEach((b) => {
      sheet.addRow({
        bookingCode: b.bookingCode,
        name: b.name,
        email: b.email,
        phone: b.phone,
        services: b.services,
        date: b.date,
        timeSlot: b.timeSlot,
        sport: b.sport,
        notes: b.notes,
        submittedAt: b.submittedAt
          ? new Date(b.submittedAt).toLocaleString("en-IN", { hour12: true })
          : "",
      });
    });

    sheet.autoFilter = { from: "A1", to: "J1" };

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="ssi-bookings-${new Date()
          .toISOString()
          .split("T")[0]}.xlsx"`,
      },
    });
  } catch (error: unknown) {
    console.error("Excel export error:", error);
    return NextResponse.json(
      { error: "Failed to generate Excel export." },
      { status: 500 }
    );
  }
}
