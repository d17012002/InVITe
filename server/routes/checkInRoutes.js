const express = require("express");
const router = express.Router();
const {
    checkInMail,
} = require("../controllers/checkInController");

router.route("/event/checkInConfirmation").post(checkInMail);

module.exports = router;
