// server.ts

import express from 'express';
import { Queue } from 'bull';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

// Configurar nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'controlriskpiv@gmail.com',
    pass: 'PIVcontrolrisk'
  }
});

// Configurar Bull.js
const emailQueue = new Queue('emails');

// Definir la tarea para enviar correo electrónico
emailQueue.process(async (job) => {
  const { to, subject, text } = job.data;
  
  // Enviar correo electrónico
  await transporter.sendMail({
    from: 'controlriskpiv@gmail.com',
    to,
    subject,
    text
  });
});

// Programar el envío de correo electrónico cada cierto tiempo
setInterval(() => {
  emailQueue.add({
    to: 'joksanmj777@gmail.com',
    subject: 'Asunto del correo',
    text: 'Contenido del correo'
  });
}, 60000); // Envía un correo cada 60 segundos

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
