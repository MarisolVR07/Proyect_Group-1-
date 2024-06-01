// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const email = "controlriskpiv@gmail.com";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: "htzj ghnl xdwx xydl",
  },
  tls: {
    rejectUnauthorized: false,  
  },
});

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text } = await req.json();
    console.log('Sending email to:', to);

    await transporter.sendMail({
      from: `ISC <${email}>`,
      to,
      subject,
      text,
    });

    console.log('Email sent successfully');
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

  

  
