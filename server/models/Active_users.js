const { Schema, model } = require("mongoose");

const ActiveUserSchema = new Schema({
    userName: {
        type: String,
    },
    userId: {
        type: String,
    },
    socketId: {
        type: String,
    },
});

const ActiveUser = new model("ActiveUser", ActiveUserSchema);
module.exports = ActiveUser;