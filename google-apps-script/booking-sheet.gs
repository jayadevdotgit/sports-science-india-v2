/**
 * Google Apps Script web app for Sports Science India booking data.
 *
 * HOW TO SET UP:
 * 1. Create a Google Sheet and note its ID (from the URL: /d/<SHEET_ID>/edit).
 * 2. Open Extensions > Apps Script, delete any default code, paste this file's content.
 * 3. Replace SHEET_ID below with your sheet ID.
 * 4. Set a shared secret below (must match GOOGLE_SHEETS_TOKEN in .env.local).
 * 5. Deploy: Deploy > New deployment > Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the deployment URL and set it as GOOGLE_SHEETS_WEBHOOK_URL in .env.local
 *      (and in Vercel env vars).
 *
 * NOTE: The sheet must have a "Bookings" tab. Headers:
 * Booking Code | Doctor | Name | Email | Phone | Services | Date | Time Slot | Sport | Notes | Submitted At
 */

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";
const SHARED_TOKEN = "YOUR_SHARED_SECRET_HERE";
const SHEET_NAME = "Bookings";

function authorize_(key) {
  if (key !== SHARED_TOKEN) throw new Error("Unauthorized");
}

function ensureHeaders_() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    return SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Booking Code",
      "Doctor",
      "Name",
      "Email",
      "Phone",
      "Services",
      "Date",
      "Time Slot",
      "Sport",
      "Notes",
      "Submitted At",
    ]);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    authorize_(e.parameter.key);
    const payload = JSON.parse(e.postData.contents);
    const sheet = ensureHeaders_();
    sheet.appendRow([
      payload.bookingCode || "",
      payload.doctor || "",
      payload.name || "",
      payload.email || "",
      payload.phone || "",
      payload.services || "",
      payload.date || "",
      payload.timeSlot || "",
      payload.sport || "",
      payload.notes || "",
      payload.submittedAt || new Date().toISOString(),
    ]);
    return jsonOutput_({ ok: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  authorize_(e.parameter.key);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) return jsonOutput_({ ok: true, data: [] });

  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] != null ? String(row[idx]) : "";
    });
    rows.push(obj);
  }
  return jsonOutput_({ ok: true, data: rows });
}

function jsonOutput_(obj, status) {
  const out = ContentService.createTextOutput(JSON.stringify(obj));
  out.setMimeType(ContentService.MimeType.JSON);
  if (status === 500) out.setContent(
    JSON.stringify({ ok: false, error: obj.error })
  );
  return out;
}
