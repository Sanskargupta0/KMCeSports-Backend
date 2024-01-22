const User = require("../models/User_model");

const userdata = async (req, res) => {
  try {
    const userData = req.user;
    const userDataFromDB = await User.findById(userData.userid)
      .select("-password")
      .select({
        isVerified: 0,
        isAdmin: 0,
      });
    res.status(200).json(userDataFromDB);
  } catch (error) {
    console.log(error);
  }
};

module.exports = userdata;
