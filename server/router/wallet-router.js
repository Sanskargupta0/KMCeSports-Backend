const express = require("express");
const router = express.Router();
const KMCWallet = require("../controllers/wallet-controllers");
const authToken = require("../middleware/auth-token");


router
    .route("/wallet")
    .get(authToken, KMCWallet.getWalletData);

router
    .route("/wallet/transaction")
    .get(authToken, KMCWallet.paymentHistory);

router
    .route("/wallet/redeemItems")
    .get(authToken, KMCWallet.getRedeemItems);

module.exports = router;