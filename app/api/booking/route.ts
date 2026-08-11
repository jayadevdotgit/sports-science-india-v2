import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendBooking } from "@/lib/bookings";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, services, date, timeSlot, sport, notes } = body;

    // Basic Validation
    if (!name || !email || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Date, Time Slot)." },
        { status: 400 }
      );
    }

    // Generate a unique booking code (e.g. SSI-AB12CD34)
    const bookingCode = `SSI-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

    const selectedServicesText =
      Array.isArray(services) && services.length > 0
        ? services.join(", ")
        : "General Sports Science Assessment";

    // SMTP Configuration from Environment Variables
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const clinicEmail = process.env.CLINIC_EMAIL || "info@sportsscienceindia.com";

    // Format human-readable date (no UTC shifting)
    const [y, m, d] = String(date).split("-").map(Number);
    const formattedDate = new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    console.log("=== NEW BOOKING ASSESSMENT SUBMISSION ===");
    console.log({
      bookingCode,
      name,
      email,
      phone,
      services: selectedServicesText,
      date: formattedDate,
      timeSlot,
      sport: sport || "Not specified",
      notes: notes || "None",
    });

    // Check if SMTP is configured
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // 1. Email to Clinic Team
      const clinicMailOptions = {
        from: `"SSI Booking Portal" <${smtpUser}>`,
        to: clinicEmail,
        replyTo: email,
        subject: `🚨 NEW BOOKING: ${name} - ${formattedDate} (${timeSlot})`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #0c0c0e; color: #ffffff; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #2a2a30;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #ff6b17; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">SPORTS SCIENCE INDIA</h2>
              <p style="color: #a0a0b0; font-size: 13px; margin-top: 4px;">New Athlete Assessment Booking Request</p>
              <div style="display: inline-block; background-color: rgba(255, 107, 23, 0.15); border: 1px solid #ff6b17; color: #ff6b17; padding: 8px 20px; border-radius: 8px; margin-top: 12px; font-size: 18px; font-weight: 800; letter-spacing: 2px;">${bookingCode}</div>
            </div>
            
            <div style="background-color: #16161c; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b17; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #ffffff; font-size: 16px;">Appointment Details</h3>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Booking Code:</strong> <span style="color: #ff8c38; font-weight: 700;">${bookingCode}</span></p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Time Slot:</strong> ${timeSlot}</p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Requested Services:</strong> <span style="color: #ff8c38; font-weight: 600;">${selectedServicesText}</span></p>
            </div>

            <div style="background-color: #16161c; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #ffffff; font-size: 16px;">Athlete Information</h3>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Full Name:</strong> ${name}</p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #ff8c38;">${email}</a></p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #ff8c38;">${phone}</a></p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Sport / Activity:</strong> ${sport || "N/A"}</p>
              <p style="margin: 6px 0; color: #d0d0e0; font-size: 14px;"><strong>Goals / Notes:</strong> ${notes || "None provided"}</p>
            </div>

            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666677; border-t: 1px solid #22222d; padding-top: 15px;">
              Sports Science India • Automated Performance Portal
            </div>
          </div>
        `,
      };

      // 2. Confirmation Email to Customer
      const customerMailOptions = {
        from: `"Sports Science India" <${smtpUser}>`,
        to: email,
        subject: `Booking Confirmed! Sports Assessment with SSI on ${formattedDate}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #09090b; color: #ffffff; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
            <div style="text-align: center; margin-bottom: 28px;">
              <div style="display: inline-block; background-color: rgba(255, 107, 23, 0.15); border: 1px solid rgba(255, 107, 23, 0.4); color: #ff6b17; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                BOOKING CONFIRMATION
              </div>
              <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin-top: 16px; margin-bottom: 8px;">We're Excited to Meet You, ${name}!</h1>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0;">Your sports performance assessment booking request has been successfully received.</p>
            </div>

            <div style="background: linear-gradient(135deg, #18181b 0%, #0f0f12 100%); padding: 24px; border-radius: 12px; border: 1px solid #27272a; margin-bottom: 24px;">
              <h3 style="color: #ff6b17; font-size: 14px; text-transform: uppercase; tracking: 1px; margin-top: 0; margin-bottom: 16px;">Appointment Summary</h3>
              
              <div style="text-align: center; background-color: #121215; border: 1px dashed #ff6b17; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">Your Booking Code</p>
                <p style="margin: 6px 0 0; color: #ff6b17; font-size: 24px; font-weight: 800; letter-spacing: 3px;">${bookingCode}</p>
                <p style="margin: 8px 0 0; color: #71717a; font-size: 11px;">Please keep this code for reference.</p>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #e4e4e7;">
                <tr>
                  <td style="padding: 8px 0; color: #71717a; width: 120px;">Services:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #ffffff;">${selectedServicesText}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a;">Date:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #ffffff;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a;">Time Slot:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #ff6b17;">${timeSlot}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a;">Athlete Name:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #ffffff;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a;">Contact Phone:</td>
                  <td style="padding: 8px 0; font-weight: 600; color: #ffffff;">${phone}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #121215; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px stroke #27272a;">
              <h4 style="margin-top: 0; color: #ffffff; font-size: 15px;">What to Expect Next:</h4>
              <ul style="color: #a1a1aa; font-size: 13px; line-height: 1.6; padding-left: 20px; margin-bottom: 0;">
                <li>Our Sports Science specialist will review your goals and confirm your time slot.</li>
                <li>Please wear comfortable athletic gear suitable for movement & biomechanical testing.</li>
                <li>If you have any previous medical reports or athletic records, bring them along!</li>
              </ul>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #27272a;">
              <p style="color: #a1a1aa; font-size: 13px; margin-bottom: 6px;">Need to reschedule or have questions?</p>
              <p style="margin: 0; font-size: 14px; font-weight: 600;">
                <a href="mailto:info@sportsscienceindia.com" style="color: #ff6b17; text-decoration: none;">info@sportsscienceindia.com</a>
              </p>
            </div>
          </div>
        `,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(clinicMailOptions),
        transporter.sendMail(customerMailOptions),
      ]);
    } else {
      console.log("ℹ️ SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment. Simulated email successfully!");
    }

    // Persist booking for admin Excel export
    try {
      await appendBooking({
        bookingCode,
        name,
        email,
        phone,
        services: selectedServicesText,
        date,
        timeSlot,
        sport: sport || "Not specified",
        notes: notes || "None",
        submittedAt: new Date().toISOString(),
      });
    } catch (storageError: unknown) {
      console.error("Failed to persist booking:", storageError);
    }

    return NextResponse.json({
      success: true,
      message: "Assessment booking submitted successfully! A confirmation email has been sent.",
      data: {
        bookingCode,
        name,
        email,
        date: formattedDate,
        timeSlot,
        services: selectedServicesText,
      },
    });
  } catch (error: unknown) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "Failed to process booking request. Please try again later." },
      { status: 500 }
    );
  }
}
