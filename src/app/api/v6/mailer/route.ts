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
     html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            font-size: 20px; 
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(to right, #4B0082, #000000);
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            text-align: center;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${subject}</h1>
        </div>
        <div class="content">
            <p>${text}</p>
            <p>Don't forget how necessary this assessment is for the company.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ISC. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
    });

    console.log('Email sent successfully');
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}