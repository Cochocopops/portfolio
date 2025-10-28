import { NextResponse } from 'next/server';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const host = process.env.OUTLOOK_HOST || 'smtp.office365.com';
    const port = Number(process.env.OUTLOOK_PORT || 587);
    const user = process.env.OUTLOOK_USER;
    const pass = process.env.OUTLOOK_PASS;
    const to = process.env.CONTACT_TO || 'corentin.chantereau@edu.devinci.fr';

    if (!user || !pass) {
      return NextResponse.json({ error: 'Email env vars not set' }, { status: 500 });
    }

    const nodemailerModule: any = await (Function("return import('nodemailer')")() as Promise<any>);
    const nodemailer = nodemailerModule.default || nodemailerModule;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #111; border-bottom: 2px solid #111; padding-bottom: 10px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${String(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${String(email)}">${String(email)}</a></p>
        <p><strong>Subject:</strong> ${String(subject)}</p>
        <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #111;">
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin-top: 10px; line-height: 1.6;">${String(message).replace(/\n/g, '<br/>')}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: user,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


