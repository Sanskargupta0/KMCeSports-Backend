const { Schema, model } = require("mongoose");

const globalNotificationSchema = new Schema({
    message: { type: String, required: [true, "Message is required"] },
    date: {
      type: Date,
      default: Date.now,
    },
});

const GlobalNotification = new model(
  "GlobalNotification",
  globalNotificationSchema
);
module.exports = GlobalNotification;
