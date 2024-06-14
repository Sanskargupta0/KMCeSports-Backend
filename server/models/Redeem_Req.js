const mongoose = require("mongoose");

const RedeemReqSchema = new mongoose.Schema({
    user: {
      name: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    transactions: [
      {
        redeemItem: {
          type: String,
          required: true,
        },
        kmcCoins: {
          type: Number,
          required: true,
        },
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
            type: Number,
            default: 2,
          }
      },
    ],
  });

  const RedeemReq = mongoose.model("RedeemReq", RedeemReqSchema);

  module.exports = RedeemReq;