// emailWorker.ts
// Este es un ejemplo básico, deberás utilizar un servicio de correo electrónico como Nodemailer para enviar correos electrónicos.

// Importa las librerías necesarias
import nodemailer from 'nodemailer';

// Función para enviar correos electrónicos


const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: 'controlriskpiv@gmail.com',
      pass: 'PIVcontrolrisk'
    }
  })

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: 'controlriskpiv@gmail.com',
      to,
      subject,
      html,
    })
    console.log('Email sent successfully.')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
