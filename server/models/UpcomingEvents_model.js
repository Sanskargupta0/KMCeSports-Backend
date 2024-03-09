const { Schema, model } = require("mongoose");

const UpcomingEventsSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Extra Details is required"]
    },
    extraDetails: {
        type: String,
        required: [true, "extraDetails is required"]
    },
    image: {
        type: String,
        required: [true, "Image Name is required"]
    },
});


const UpcomingEvents = new model("UpcomingEvents", UpcomingEventsSchema);
module.exports = UpcomingEvents;
