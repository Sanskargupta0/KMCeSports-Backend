const Games = require("../models/Games_model");
const User = require("../models/User_model");
const UpcommingGames = require("../models/UpcomingEvents_model");

const gamedata = async (req, res, next) => {
  try {
    const gameData = await Games.find().select({
      playerdata: 0});
    const commingSoonData = await UpcommingGames.find();
    res.status(200).json({ gameData, commingSoonData });
  } catch (error) {
    err = {
        msg: "Failed to get Games Data and BookMark Data",
        status: 500,
        extrD: error,
      };
    next(err);
  }
};

const userBookmarkAdd = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userid);
    user.bookmarks.push(req.body.gameId);
    await user.save();
    res.status(200).json({ msg: "Bookmark Added" });
  } catch (error) {
    err = {
        msg: "Failed to Add BookMark",
        status: 500,
        extrD: error,
      };
    next(err);
  }
};

const userBookmarkRemove = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userid);
    user.bookmarks.pull(req.body.gameId);
    await user.save();
    res.status(200).json({ msg: "Bookmark Removed" });
  } catch (error) {
    err = {
        msg: "Failed to Remove BookMark",
        status: 500,
        extrD: error,
      };
    next(err);
  }
};

const userJoinedGames = async(req, res, next)=>{
try {
  const user = await User.findById(req.user.userid);
  res.status(200).json(user.joinedGames);
} catch (error) {
  err = {
    msg: "Failed to Get User Joined Games",
    status: 500,
    extrD: error
    };
    next(err);
}
};

module.exports = { gamedata, userBookmarkAdd, userBookmarkRemove, userJoinedGames };
