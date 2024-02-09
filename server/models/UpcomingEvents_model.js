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
    link: {
        type: String,
        required: [true, "Link for the Registartion page"]
    },
    image: {
        type: String,
        required: [true, "Image Name is required"]
    },
});


const UpcomingEvents = new model("UpcomingEvents", UpcomingEventsSchema);
module.exports = UpcomingEvents;
