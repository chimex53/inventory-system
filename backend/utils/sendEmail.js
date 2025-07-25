import nodemailer from 'nodemailer';
//create a transporter object using the default SMTP transport 
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    }, 
  });
   
//options for sending email
  const mailOptions = {
    from: `"Inventory System" <${process.env.EMAIL_USER}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  await transporter.sendMail(mailOptions);
}

//send endEmail function
transporter.sendEmail((error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  })
export default sendEmail;