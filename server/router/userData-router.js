const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth-token");
const handelUserData = require("../controllers/userData-controllers");

router
    .route("/userData")
    .get(authToken, handelUserData.userdata);

router
    .route("/updateUserData")
    .post(authToken, handelUserData.updateUserData);

module.exports = router;
