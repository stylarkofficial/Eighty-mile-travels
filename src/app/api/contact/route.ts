import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL || "contact@eightymile.co";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL || "Eighty Mile Travel <onboarding@resend.dev>";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  website?: string;
};

function normalize(value: string | undefined, maxLength: number) {
  return (value || "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "Contact form email is not configured yet. Add RESEND_API_KEY in Vercel to enable sending.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = (await request.json()) as ContactPayload;

    if (payload.website) {
      return NextResponse.json({ success: true });
    }

    const name = normalize(payload.name, 120);
    const email = normalize(payload.email, 160);
    const phone = normalize(payload.phone, 40);
    const subject = normalize(payload.subject, 120) || "General enquiry";
    const message = normalize(payload.message, 4000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2328;">
        <h2>New contact enquiry from Eighty Mile Travel</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `;

    const text = [
      "New contact enquiry from Eighty Mile Travel",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Website enquiry: ${subject}`,
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      return NextResponse.json(
        { error: "The message could not be sent. Please try again in a moment." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
