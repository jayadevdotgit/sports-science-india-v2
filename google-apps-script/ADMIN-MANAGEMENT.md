# Activate employee management

1. Open the existing Google Apps Script project used for appointments and staff.
2. Replace the contents of its staff-portal.gs file with the local google-apps-script/staff-portal.gs file. Keep booking-sheet.gs and the existing doPost dispatcher unchanged.
3. Save. Choose Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy. Keep the existing deployment URL.
4. Sign in at /admin, then open /admin/staff (also linked under Staff & Leave > Staff eligibility). SSI Office can also use its existing staff OTP sign-in.
5. Open Team to add employees, edit names/emails/joining dates, or remove/restore access. Removal disables login and retains records. Email corrections migrate attendance and leave history. SSI Office is protected and excluded from employee totals.
6. Approve or reject requests under Leave & quota. Attendance and leave refresh every 15 seconds while the management page is visible and when returning to it. Check-in/out also returns the saved record immediately.

Leave balances continue to follow the full annual allowance after 90-day eligibility policy. This does not change appointment booking code.
