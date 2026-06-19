import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const user_otp = async (firstname, lastname, email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Hello",
      text: "Hello world?",
      html: `<b>Hello world?</b> ${firstname} ${lastname} ${email} ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
    
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

export const resend_otp = async (firstname, lastname, email, otp) => {

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Hello",
      text: "Hello world?",
      html: `<b>Hello world?</b> ${firstname} ${lastname} ${email} ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
    
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}