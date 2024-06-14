const mongoose = require("mongoose");

const KMCWalletSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      transactionType: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      discription: {
        type: String,
        default: "",
      },
      BAT: {
        type: Number,
      },
    },
  ],
});

const KMCWallet = mongoose.model("KMCWallet", KMCWalletSchema);

module.exports = KMCWallet;
