const mongoose = require("mongoose");

const RedeemItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    kmcCoins: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    form: {
        type: Array,
        default: [],
    },
    request:{
        type: Array,
        default: [],
    }
});

const RedeemItem = mongoose.model("RedeemItem", RedeemItemSchema);

module.exports = RedeemItem;