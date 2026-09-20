# Activate employee management

1. Open the existing Google Apps Script project used for appointments and staff.
2. Replace the contents of its staff-portal.gs file with the local google-apps-script/staff-portal.gs file. Keep booking-sheet.gs and the existing doPost dispatcher unchanged.
3. Save. Choose Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy. Keep the existing deployment URL.
4. Sign in at /admin, then open /admin/staff (also linked under Staff & Leave > Staff eligibility). SSI Office can also use its existing staff OTP sign-in.
5. Open Team to add employees, edit names/emails/joining dates, or remove/restore access. Removal disables login and retains records. Email corrections migrate attendance and leave history. SSI Office is protected and excluded from employee totals.
6. Approve or reject requests under Leave & quota. Attendance and leave refresh every 15 seconds while the management page is visible and when returning to it. Check-in/out also returns the saved record immediately.

Leave balances continue to follow the full annual allowance after 90-day eligibility policy. This does not change appointment booking code.

## Monthly PDF report

Deploy the latest staff-portal.gs to enable the administrator-only report operation. In staff management, select a month under Monthly PDF report, open the report, and choose Print / Save as PDF. Select A4 landscape and disable browser headers/footers. No additional Vercel environment variables are needed.

The report includes all attendance rows in the selected month, leave requests overlapping it (with month-only day counts excluding Sundays), and current employee directory details. It excludes SSI Office and all authentication secrets. It shows the current status of records when generated, not a frozen historical month-end snapshot. Save the PDF locally when closing each month; exports are manual, not automatically scheduled.
