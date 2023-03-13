const nodemailer = require("nodemailer");

function sendCheckInMail(data) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "the4musketeeers@gmail.com",
            pass: "jyestailmwokdibd",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: "the4musketeeers@gmail.com",
        to: data.email,
        subject: `${data.name} You've Checked In - InVITe`,
        html: `Dear ${data.name},<br><br>
           Congratulations, you've successfully checked in to our event!<br><br>
           Name: ${data.name}<br>
           Registration Number: ${data.regNo}<br>
           Pass ID: ${data.passID}<br><br>
           If you have any questions or concerns, please don't hesitate to contact us:<br>
           Anurag Singh: 2002anuragksingh@gmail.com<br>
           Devanshu Yadav: devanshu.yadav2020@vitbhopal.ac.in<br>
           Saksham Gupta: saksham.gupta2020@vitbhopal.ac.in<br><br>
           Thank you for choosing InVITe!<br><br>
           Best regards,<br>
           The InVITe Team`,
    };

    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log(err);
        } else {
            console.log("Checked In Email sent successfully");
        }
    });
}
const checkInMail = async (req, res) => {
    console.log("checkin");
    const data = {
        name: req.body.name,
        email: req.body.email,
        regNo: req.body.regNo,
        passID: req.body.passID,
    }
    sendCheckInMail(data);
    res.status(200).send({msg: "successfully checked in"})
};

module.exports = {
    checkInMail,
};
