const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    subtitle: {
        type: String,
        required: [true, "Description is required"]
    },
    type: {
        type: String,
        required: [true, "Image is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start Time is required"]
    },
    extraDetails: {
        type: String,
        required: [true, "Extra Details is required"]
    },
    image: {
        type: String,
        required: [true, "Image Name is required"]
    },
    numberofPlayers: {
        number:{type: Number, 
        required: [true, "Number of Players is required"]},
        currentLeftSpace:{type: Number,
        required: [true, "Number of Players space left is required"]},
    },
    playerdata: {
        type: Array,
        default: [],
    }
});

const Game = new model("Game", gameSchema);
module.exports = Game;