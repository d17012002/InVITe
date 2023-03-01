const express = require("express");
const router = express.Router();
const { postEvent, allEvents, particularEvent } = require("../controllers/eventController");

router.route("/post/event").post(postEvent);
router.route("/getallevents").get(allEvents);
router.route("/getevent").post(particularEvent);


module.exports = router;
