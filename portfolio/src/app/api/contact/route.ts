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
      <div style="font-family: Arial, sans-serif;">
        <p><strong>Nom:</strong> ${String(name)}</p>
        <p><strong>Email:</strong> ${String(email)}</p>
        <p><strong>Sujet:</strong> ${String(subject)}</p>
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, '<br/>')}</p>
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


