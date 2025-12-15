import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAIL_APP_PASSWORD,
  },
});

export default transporter;
