const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        event_id: {
            type: String,
            requird: true,
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
        cover: {
            type: String,
            default:
                "https://eventplanning24x7.files.wordpress.com/2018/04/events.png",
        },
        profile: {
            type: String,
            default:
                "https://i.etsystatic.com/15907303/r/il/c8acad/1940223106/il_794xN.1940223106_9tfg.jpg",
        },
        organizer: {
            type: String,
        },
        participants: [],
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = {
    Event,
    eventSchema,
};
