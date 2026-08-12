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
 *
 * A second "Config" tab holds per-doctor availability. Headers:
 * Doctor | Available | Start Time | End Time | Updated At
 */

const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";
const SHARED_TOKEN = "YOUR_SHARED_SECRET_HERE";
const SHEET_NAME = "Bookings";
const CONFIG_SHEET_NAME = "Config";

function authorize_(key) {
  if (key !== SHARED_TOKEN) throw new Error("Unauthorized");
}

function ensureHeaders_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
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

function ensureConfigHeaders_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Doctor", "Available", "Start Time", "End Time", "Updated At"]);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    authorize_(e.parameter.key);
    const payload = JSON.parse(e.postData.contents);

    // Admin config updates
    if (payload.action === "config") {
      const doctors = Array.isArray(payload.doctors) ? payload.doctors : [];
      const sheet = ensureConfigHeaders_();
      // Store times as text (apostrophe prefix) so Google Sheets doesn't convert them to dates.
      const rows = doctors.map((doc) => [
        String(doc.name || ""),
        doc.available ? "Yes" : "No",
        "'" + String(doc.start || ""),
        "'" + String(doc.end || ""),
        new Date().toISOString(),
      ]);
      // Clear existing config rows (keep header) and rewrite
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
      }
      if (rows.length > 0) {
        sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      }
      return jsonOutput_({ ok: true });
    }

    // Normal booking append
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
      formatDate_(payload.submittedAt),
    ]);
    return jsonOutput_({ ok: true });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err) }, 500);
  } finally {
    lock.releaseLock();
  }
}

function formatDate_(iso) {
  try {
    const d = new Date(iso || new Date().toISOString());
    if (isNaN(d.getTime())) return iso || "";
    return Utilities.formatDate(d, Session.getScriptTimeZone(), "dd MMM yyyy, hh:mm a");
  } catch (err) {
    return iso || "";
  }
}

function doGet(e) {
  authorize_(e.parameter.key);

  // Config read
  if (e.parameter.action === "config") {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(CONFIG_SHEET_NAME);
    if (!sheet || sheet.getLastRow() === 0) return jsonOutput_({ ok: true, data: [] });
    const values = sheet.getDataRange().getValues();
    const headers = values[0];
    const rows = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (!row[0]) continue; // skip empty rows
      const obj = {};
      headers.forEach((h, idx) => {
        const v = row[idx];
        let text;
        // Google Sheets stores "04:00 PM" as a Date or with a text-forcing apostrophe; normalize both.
        if (v instanceof Date) {
          text = Utilities.formatDate(v, Session.getScriptTimeZone(), "hh:mm a");
        } else {
          text = v != null ? String(v) : "";
        }
        obj[h] = text.replace(/^'/, "");
      });
      rows.push(obj);
    }
    return jsonOutput_({ ok: true, data: rows });
  }

  // Bookings read
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
