import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,      // Use consistent environment variables
    port: process.env.EMAIL_PORT,
    secure: false,                     // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"Inventory System" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.text || undefined,
    html: options.html || undefined,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
