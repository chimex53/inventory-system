import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

const contactUs = asyncHandler(async (req, res) => {
    try {
        const { subject, message } = req.body;
        
        // Get user info
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error("User not found, please signup");
        }

        // Validation
        if (!subject || !message) {
            res.status(400);
            throw new Error("Please add subject and message");
        }

        const emailData = {
            send_to: process.env.SMTP_USER,
            sent_from: process.env.SMTP_USER,
            reply_to: user.email,
            subject: `Contact Form - ${subject}`,
            message: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Contact Form Submission</h2>
                    <p><strong>From:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        };

        await sendEmail(
            emailData.subject,
            emailData.message,
            emailData.send_to,
            emailData.sent_from,
            emailData.reply_to
        );

        res.status(200).json({ 
            success: true, 
            message: "Email sent successfully" 
        });

    }  catch (error) {
        console.error("Email Error:", error);
        
        // Check if it's a connection timeout
        if (error.code === 'ETIMEDOUT' || error.message.includes('ETIMEDOUT')) {
            res.status(500).json({
                success: false,
                message: "Email service temporarily unavailable. Please try again later or contact support directly."
            });
        } else if (error.code === 'ECONNREFUSED') {
            res.status(500).json({
                success: false,
                message: "Email service configuration error. Please contact support."
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Email could not be sent. Please try again later."
            });
        }
    }

});

export default contactUs;