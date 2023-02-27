const express = require("express");
const router = express.Router();
const { setAdmin, adminAuth } = require("../controllers/adminController");

router.route("/setadmin").post(setAdmin);
router.route("/admin/auth").post(adminAuth);

module.exports = router;
