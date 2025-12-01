// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
module.exports.sendMail=(email,subject,content) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // App password or real password if less secure apps are allowed
      }
    });
    
    // Configure the mailoptions object
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: content
    };
    
    // Send the email
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });
}