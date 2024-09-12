// emailRouter.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const emailRouter = express.Router();

// Setup the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service provider
  auth: {
    user: process.env.EMAIL_USER, // Email user from environment variable
    pass: process.env.EMAIL_PASS, // Email password from environment variable
  },
  logger: true, // Enable logging
  debug: true,  // Enable debugging
});

// POST - Send an email
emailRouter.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: to, // List of receivers
    subject: subject, // Subject line
    text: body, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

export default emailRouter;
