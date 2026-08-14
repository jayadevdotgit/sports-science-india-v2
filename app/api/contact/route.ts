import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email and message." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const clinicEmail = process.env.CLINIC_EMAIL || "sportsscienceindia.office@gmail.com";

    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log({ name, email, phone: phone || "Not provided", message });

    if (!smtpUser || !smtpPass) {
      console.log("ℹ️ SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment. Simulated email successfully!");
      return NextResponse.json({
        success: true,
        message: "Your message has been received. We'll be in touch soon!",
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"SSI Website" <${smtpUser}>`,
      to: clinicEmail,
      replyTo: email,
      subject: `📩 NEW MESSAGE: ${name} via Contact Form`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0c0e; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #2a2a30;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #ff6b17; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">SPORTS SCIENCE INDIA</h2>
            <p style="color: #a0a0b0; font-size: 13px; margin-top: 4px;">New Contact Message</p>
          </div>
          <div style="background-color: #16161c; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b17; margin-bottom: 20px;">
            <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff8c38;">${email}</a></p>
            <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
          </div>
          <div style="background-color: #16161c; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #ffffff; font-size: 16px;">Message</h3>
            <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666677; border-top: 1px solid #22222d; padding-top: 15px;">
            Sports Science India • Automated Contact Portal
          </div>
        </div>
      `,
    });

    // Automated confirmation reply to the submitter
    await transporter.sendMail({
      from: `"Sports Science India" <${smtpUser}>`,
      to: email,
      subject: "We've received your message — Sports Science India",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; color: #ffffff; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="display: inline-block; background-color: rgba(255, 107, 23, 0.15); border: 1px solid rgba(255, 107, 23, 0.4); color: #ff6b17; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
              MESSAGE RECEIVED
            </div>
            <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin-top: 16px; margin-bottom: 8px;">Thank You, ${name}!</h1>
            <p style="color: #a1a1aa; font-size: 14px; margin: 0;">Your message has been received by the Sports Science India team.</p>
          </div>

          <div style="background: linear-gradient(135deg, #18181b 0%, #0f0f12 100%); padding: 24px; border-radius: 12px; border: 1px solid #27272a; margin-bottom: 24px;">
            <h3 style="color: #ff6b17; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 0; margin-bottom: 16px;">Your Message</h3>
            <p style="margin: 0; color: #e4e4e7; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background-color: #121215; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #27272a;">
            <h4 style="margin-top: 0; color: #ffffff; font-size: 15px;">What happens next?</h4>
            <ul style="color: #a1a1aa; font-size: 13px; line-height: 1.6; padding-left: 20px; margin-bottom: 0;">
              <li>Our team will review your message and respond shortly.</li>
              <li>For urgent enquiries, call us at <a href="tel:+917381380010" style="color: #ff6b17; text-decoration: none;">+91 73813 80010</a>.</li>
              <li>Follow us on social media for the latest from Sports Science India.</li>
            </ul>
          </div>

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #27272a;">
            <p style="color: #a1a1aa; font-size: 13px; margin-bottom: 6px;">Questions?</p>
            <p style="margin: 0; font-size: 14px; font-weight: 600;">
              <a href="mailto:sportsscienceindia.office@gmail.com" style="color: #ff6b17; text-decoration: none;">sportsscienceindia.office@gmail.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll be in touch soon!",
    });
  } catch (error: unknown) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}