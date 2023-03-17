const express = require("express");
const router = express.Router();
const {
    setAdmin,
    adminAuth,
    adminDetails,
} = require("../controllers/adminController");

router.route("/setadmin").post(setAdmin);
router.route("/admin/auth").post(adminAuth);
router.route("/admin/details").post(adminDetails);

module.exports = router;
