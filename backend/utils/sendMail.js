const nodemailer=require("nodemailer")

const sendMail=async(options)=>{
     console.log("SMTP_HOST:", process.env.SMTP_HOST);
   const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // must be smtp.gmail.com
  port: process.env.SMTP_PORT,   // 465
  secure: true,                  // true for port 465
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

    const mailOptions={
        from :process.env.SMPT_MAIL, // sender
        to: options.email, // reciver
        subject: options.subject,  // subject line
        text: options.message, //plain text
    };

    await transporter.sendMail(mailOptions);
}

module.exports=sendMail

