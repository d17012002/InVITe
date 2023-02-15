const express = require("express");
const router = express.Router();
const { userInfo } = require("../controllers/dashboardController");

router.route("/dashboard").get(userInfo);

module.exports = router;
