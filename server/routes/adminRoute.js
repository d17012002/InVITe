const express = require("express");
const router = express.Router();
const { setAdmin } = require("../controllers/adminController");

router.route("/setadmin").post(setAdmin);


module.exports = router;
