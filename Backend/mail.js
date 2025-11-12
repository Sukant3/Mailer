const nodemailer = require("nodemailer");
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.LOGIN,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error(" SMTP connection failed:", error);
  } else {
    console.log(" Server is ready to send emails!");
  }
});



// app.post('/sendmail',async(req,res)=>{
//   const info = await transporter.sendMail({
//     from: `"Person" <${process.env.EMAIL}>`,
//     to: req.body.to,
//     subject: req.body.subject,
//     text: req.body.text, // plain‑text body
//     html: `<p>${req.body.text}</p>`, // HTML body
//   });

//   console.log("Message sent:", info.messageId);
//   res.json({'success':true})
// });

app.post('/sendmail', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    // message to Admin
    const infoAdmin = await transporter.sendMail({
      from: `"Person" <${process.env.EMAIL}>`,
      to: process.env.EMAIL, //admin email
      subject: req.body.subject,
      text:req.body.text,
      html:req.html
    });

    console.log("Message sent to admin:", infoAdmin.messageId);

    // Send auto-reply to user
    const infoUser = await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL}>`,
      to: to, // user’s email
      subject: "We received your message!",
      html: `
        <p>Hi,</p>
        <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote>${text}</blockquote>
        <p>Best regards,<br>Support Team</p>
      `
    });

    console.log("Auto-reply sent to user:", infoUser.messageId);

    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send emails" });
  }
});




  app.listen(5674, () => console.log("Server is running"))



