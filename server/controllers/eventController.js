const {Event} = require("../models/event");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "InVITe event super secret key here...";

const postEvent = async (req, res) => {

    const Name = req.body.name;
    const Venue = req.body.venue;
    const Date = req.body.date;
    const Time = req.body.time;
    const Desc = req.body.description;
    const Price = req.body.price;
    const Url = req.body.poster;

    const secret = JWT_SECRET;
    const payload = {
      email: Name,
    };

    const token = await jwt.sign(payload, secret);

    const new_event = new Event({
        event_id: token,
        name: Name,
        venue: Venue,
        date: Date,
        time: Time,
        description: Desc,
        price: Price,
        poster: Url,
    });

    await new_event.save((error, success) => {
        if (error) console.log(error);
        else console.log("Saved::New Event::created.");
    });

    res.status(200).send({ msg: "event created", event_id: token });
}


const allEvents = async (req, res) => {
    Event.find({}).then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(400).send({msg: 'Error fetching data', error: err});
    })
}


const particularEvent = async(req, res) => {
    const eventId = req.body.event_id;
    Event.find({event_id: eventId}).then((data) => {
        res.status(200).send(data[0]);
    })
    .catch((err) => {
        res.status(400).send({msg: 'Error fetching event', error: err});
    })
}


module.exports = {
    postEvent,
    allEvents,
    particularEvent
}