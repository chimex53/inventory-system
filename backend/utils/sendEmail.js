import nodemailer from 'nodemailer';

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: sent_from,
            to: send_to,
            replyTo: reply_to,
            subject: subject,
            html: message
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);  return info;

    } catch (error) {
      
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export default sendEmail;