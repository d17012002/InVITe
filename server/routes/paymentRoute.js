const express = require("express");
const router = express.Router();

// const parseUrl = express.urlencoded({ extended: false });
// const parseJson = express.json({ extended: false });


const { payment } = require("../controllers/paymentController");

router.route("/payment").post(payment);
// router.route("/callback").post(callback);

module.exports = router;
