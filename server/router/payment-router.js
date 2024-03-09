const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment-controller");
const authToken = require("../middleware/auth-token");


router
    .route("/checkout")
    .post(authToken, paymentController.createOrder);

router
    .route("/paymentVerification")
    .post(authToken ,paymentController.paymentVerification);


module.exports = router;