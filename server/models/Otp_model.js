const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    otp: {
        type: String,
        required: [true, "OTP is required"]
    }
});




const Otp = new mongoose.model("Validate",otpSchema);

module.exports = Otp;