const nodemailer = require("nodemailer");
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())

app.post('/sendmail',async(req,res)=>{
  const info = await transporter.sendMail({
    from: `"Person" <${process.env.EMAIL}>`,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text, // plain‑text body
    html: req.html, // HTML body
  });
   
  console.log("Message sent:", info.messageId);
  res.json({'success':true})
});

app.listen(5674 ,()=> console.log("Server is running"))


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.LOGIN,
    pass: process.env.PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: `"Person" <${process.env.EMAIL}>`,
//     to: "thombaresukant2003@gmail.com",
//     subject: "Hell000",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();

