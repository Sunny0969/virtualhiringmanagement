// VerificationCodeApi.js

const express = require('express');
const router = express.Router();

// Handle the POST request to send the verification code
router.post('/', (req, res) => {
  const { email, code } = req.body;

  // Send the verification code to the user's email
  sendVerificationCode(email, code);

  // Return a response indicating success
  res.json({ success: true });
});

function sendVerificationCode(email, code) {
  // Implement your code to send the verification code to the user's email here
  // This can be done using a library like Nodemailer

  // Example using Nodemailer:
  const nodemailer = require('nodemailer');

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the transport options for your email service provider
    // For example, if using Gmail, you would provide your Gmail SMTP settings here
    service: 'gmail',
    auth: {
      user: 'raees@gmail.com',
      pass: '123456',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'raees@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is: ${code}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification code:', error);
    } else {
      console.log('Verification code sent:', info.response);
    }
  });
}

module.exports = router;
