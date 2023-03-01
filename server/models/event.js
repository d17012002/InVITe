const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    event_id: {
      type: String,
      requird: true
    },
    name: {
      type: String,
    },
    venue: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    poster: {
        type: String,
        default: "https://eventplanning24x7.files.wordpress.com/2018/04/events.png",
    },
    participants: []
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = {
    Event,
    eventSchema
}


