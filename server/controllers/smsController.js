const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

function sendSMS(Email, otp) {
  let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.NODE_MAILER_USER,
          pass: process.env.NODE_MAILER_PASS,
      },
      tls: {
          rejectUnauthorized: false,
      },
  });

  let mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: Email,
      subject: "One Time Password - InVITe",
      html: `Please keep your OTP confidential and do not share it with anyone. The OTP will be valid for five minutes only. <br><strong>OTP: ${otp}</strong><br><br>Thank you for choosing InVITe!<br><br>If you have any questions, please contact us at:<br>Anurag Singh: 2002anuragksingh@gmail.com<br>Devanshu Yadav: devanshu.yadav2020@vitbhopal.ac.in<br>Saksham Gupta: saksham.gupta2020@vitbhopal.ac.in.`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
}


function sendTicket(Details) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: Details.email,
    subject: `Online Event Pass for ${Details.event_name} - InVITe✨`,
    html: `Thankyou <i>${Details.name}</i> for believing in us. We are all set and eagerly waiting for you to JOIN! <br> Your online pass has been generated. Do not share your pass with anyone else and carry this pass with yourself to the venue.<br><br><strong>Pass Number: ${Details.pass}</strong><br><br>Details:<br>Name: ${Details.name}<br>Amount Paid: ${Details.price}<br>Address: ${Details.address1} <br> City: ${Details.city} <br> PinCode: ${Details.zip}`
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
}


module.exports = {
  sendSMS,
  sendTicket
};
