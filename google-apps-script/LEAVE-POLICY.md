# Activate SSI leave balances

Replace the existing staff-portal script with staff-portal.gs, save, then edit the existing web app deployment and select New version. Keep the same deployment URL and existing booking dispatcher.

Open the staff portal once. The Staff sheet adds column F, Joining Date. Fill this for every employee, including the office account if it requests leave, using YYYY-MM-DD. The Team form also supports adding/updating joining dates. Do not delete/reorder existing columns. The original Quota column remains for compatibility but no longer controls leave.

Rules:
- SL and CL are separate: the full 12 days each unlock after 90 completed days from joining, valid through December 31. No prorating for late-year eligibility.
- The existing calendar-year reset/no-carry-forward convention remains. SL/CL available balance is zero during probation; all requests are locked until joining date plus 90 days.
- Approved and pending requests deduct from the annual allowance. SL/CL requests for a different calendar year are blocked.
- Marriage has a separate lifetime balance of 10 days; unpaid leave has no paid quota. Both require eligibility and approval.
- Pending and approved requests reserve the selected balance. Cancellation or rejection releases it. Approval rechecks eligibility and available balance, excluding the request itself.
- Sundays do not count; Saturdays count. All request types are blocked during the first 90 days.
- Older Sick leave/Casual leave records count against their corresponding balances. Unsupported legacy types remain in history but cannot be newly approved without review.

No changes are made to the deployed Google Sheet until the script is deployed and used. This update does not implement payroll deductions, automatic late-arrival penalties, or document uploads.
