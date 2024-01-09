"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'garciaj1246@gmail.com',
    pass: 'aosl duee njgo zqer',
  },
});

// Función para enviar correo electrónico
export const enviarCorreoElectronico = async (destinatario: string, asunto: string, cuerpo: string) => {
  try {
    const mensaje = {
      from: 'garciaj1246@gmail.com',
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mensaje);

    console.log('Correo electrónico enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('Error al enviar el correo electrónico');
  }
};
