import nodemailer from 'nodemailer';

export type LeaveNotification = {
  email: string;
  type: string;
  start: string;
  end: string;
  days: number;
  reason: string;
};

export function leaveNotificationMessage(leave: LeaveNotification) {
  return {
    subject: 'Leave request awaiting approval | Sports Science India',
    text: [
      'A new staff leave request is awaiting your review.',
      '',
      `Employee: ${leave.email}`,
      `Leave type: ${leave.type}`,
      `From: ${leave.start}`,
      `To: ${leave.end}`,
      `Leave days: ${leave.days} (Sundays excluded)`,
      '',
      'Reason:',
      leave.reason,
      '',
      'Sign in to the admin portal to approve or reject this request:',
      'https://www.sportsscienceindia.org/admin/staff',
      '',
      'This notification does not approve the request. The portal shows its current status.',
      'Sports Science India',
    ].join('\n'),
  };
}

export async function sendLeaveNotification(leave: LeaveNotification, recipient: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) throw new Error('Staff notification email is not configured');
  const port = Number(process.env.SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', port, secure: port === 465,
    auth: {user: process.env.SMTP_USER, pass: process.env.SMTP_PASS},
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000,
  });
  try {
    await transport.sendMail({
      from: {name: 'Sports Science India', address: process.env.SMTP_USER},
      to: recipient,
      ...leaveNotificationMessage(leave),
    });
  } finally { transport.close(); }
}
