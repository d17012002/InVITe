const express = require("express");
const router = express.Router();

const {
  postEvent,
  allEvents,
  particularEvent,
  deleteEvent,
  checkin,
} = require("../controllers/eventController");

router.route("/post/event").post(postEvent);
router.route("/getallevents").get(allEvents);
router.route("/getevent").post(particularEvent);
router.route("/deleteevent").post(deleteEvent);
router.route("/event/checkin").post(checkin);

module.exports = router;
