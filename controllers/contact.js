const nodeMailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    console.log(mail);
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: "",
      to: "",
      subject: subject,
      text: message,
    });

    res.status(200).json({ message: "Mail sent successfully" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendMail };
