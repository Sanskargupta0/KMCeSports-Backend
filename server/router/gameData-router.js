const express = require("express");
const router = express.Router();
const authToken = require("../middleware/auth-token");
const gameControllers= require("../controllers/gameData-controllers");

router
    .route("/gameData")
    .get(authToken, gameControllers.gamedata);

router
    .route("/userBookmarkAdd")
    .post(authToken, gameControllers.userBookmarkAdd);

router
    .route("/userBookmarkRemove")
    .post(authToken, gameControllers.userBookmarkRemove);

router
    .route("/userJoinedGames")
    .get(authToken, gameControllers.userJoinedGames);    

module.exports = router;