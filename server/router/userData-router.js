const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth-token");
const userData = require("../controllers/userData-controllers");

router.route("/userData").get(authToken, userData);

module.exports = router;
