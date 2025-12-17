import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

export default transporter;
