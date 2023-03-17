const express = require("express");
const app = express();
const OtpAuth = require("../models/otpAuth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const otpGenerator = require("otp-generator");

const { sendSMS } = require("./smsController");

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
console.log("in auth - ", JWT_SECRET);

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// route - http://localhost:5000/user/signin
const signIn = async (req, res) => {
    const Email = req.body.email;

    User.find({ email: Email }, async function (err, docs) {
        if (docs.length !== 0) {
            //clearing otp auth table
            try {
                await OtpAuth.deleteMany({ email: Email }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Users deleted successfully");
                    }
                });
            } catch (e) {
                console.log(e);
            }

            // generate otp for new user
            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            const otp = {
                email: Email,
                otp: OTP,
            };

            sendSMS(Email, otp.otp);

            console.log("Generated otp for signin: ", otp);
            //encrypting the otp and then saving to Otp_table
            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            const newUserLogin = new OtpAuth({
                email: otp.email,
                otp: otp.otp,
            });

            newUserLogin.save((error, success) => {
                if (error) console.log(error);
                else
                    console.log("Saved::otp-temporarily::ready for validation");
            });

            return res.status(200).send({ msg: "Otp sent successfully!" });
        } else {
            return res.status(400).send({
                msg: "This Email ID is not registered. Try Signing Up instead!",
            });
        }
    });
};

// route - http://localhost:5000/user/signup
const signUp = async (req, res) => {
    const Email = req.body.email;

    //validating whether user already exists or not

    User.find({ email: Email }, async function (err, docs) {
        if (docs.length !== 0) {
            return res.status(400).send({
                msg: "This Email ID is already registered. Try Signing In instead!",
            });
        } else {
            //clearing otp auth table
            try {
                await OtpAuth.deleteMany({ email: Email }, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Users deleted successfully");
                    }
                });
            } catch (e) {
                console.log(e);
            }

            // generate otp for new user
            const OTP = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            });

            const otp = {
                email: Email,
                otp: OTP,
            };
            console.log("Before hashing: ", otp);

            sendSMS(Email, otp.otp);

            //encrypting the otp and then saving to Otp_table
            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt);

            const newUserLogin = new OtpAuth({
                email: otp.email,
                otp: otp.otp,
            });

            newUserLogin.save((error, success) => {
                if (error) console.log(error);
                else console.log("Saved::otp::ready for validation");
            });

            return res.status(200).send({ msg: "Otp sent successfully!" });
        }
    });
};

// route - http://localhost:5000/user/signin/verify
const verifyLogin = async (req, res) => {
    const Email = req.body.email;
    const inputOtp = req.body.otp;

    OtpAuth.find({ email: Email }, async function (err, docs) {
        if (docs.length === 0) {
            return res
                .status(400)
                .send({ msg: "The OTP expired. Please try again!" });
        } else {
            const generatedOtp = docs[0].otp;

            const validUser = await bcrypt.compare(inputOtp, generatedOtp);

            if (Email === docs[0].email && validUser) {
                User.find({ email: Email }, async function (err, user) {
                    console.log(user);
                    res.status(200).send({
                        msg: "Sign-In successful!",
                        user_id: user[0].user_token,
                    });
                });
            } else {
                return res
                    .status(406)
                    .send({ msg: "OTP does not match. Please try again!" });
            }
        }
    });
};

// route - http://localhost:5000/user/signup/verify
const verifyOtp = async (req, res) => {
    const number = req.body.contactNumber;
    const inputOtp = req.body.otp;
    const Email = req.body.email;
    const name = req.body.username;
    const regNumber = req.body.regNumber;

    OtpAuth.find({ email: Email }, async function (err, docs) {
        if (docs.length === 0) {
            return res.status(400).send("The OTP expired. Please try again!");
        } else {
            const generatedOtp = docs[0].otp;

            const validUser = await bcrypt.compare(inputOtp, generatedOtp);

            if (Email === docs[0].email && validUser) {
                const secret = JWT_SECRET;
                const payload = {
                    email: req.body.email,
                };
                const token = jwt.sign(payload, secret);

                //saving new user
                const newUser = new User({
                    user_token: token,
                    reg_number: regNumber,
                    username: name,
                    email: Email,
                    contactNumber: number,
                });

                newUser.save((error, success) => {
                    if (error) console.log(error);
                    else console.log("Signup successful: ", newUser);
                });

                OtpAuth.deleteMany({ email: Email }, async function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`OTP table for ${Email} cleared.`);
                    }
                });

                return res
                    .status(200)
                    .send({
                        msg: "Account creation successful!",
                        user_id: token,
                    });
            } else {
                return res
                    .status(400)
                    .send({ msg: "OTP does not match. Please try again!" });
            }
        }
    });
};

module.exports = {
    signUp,
    verifyOtp,
    signIn,
    verifyLogin,
};
