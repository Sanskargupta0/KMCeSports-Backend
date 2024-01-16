const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  date: {
    type: String,
    default: Date(),
  },
  attempt: {
    type: Number,
    default: 0,
  },
});

const Otp = new mongoose.model("Validate", otpSchema);

module.exports = Otp;
