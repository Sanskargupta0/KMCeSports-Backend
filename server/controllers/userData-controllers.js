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

const updateUserData = async (req, res) => {
  try {
    const userData = req.user;
    const { updateData } = req.body;
    const userDataFromDB = await User.findById(userData.userid);
    for (let key in updateData) {
      if (
        key === "isVerified" ||
        key === "isAdmin" ||
        key === "password" ||
        key === "_id" ||
        key === "email" ||
        key === "tournaments"
      ) {
        return res.status(400).json({ message: "You can't update this data" });
      }
      if(key === "userName"){
        const userNameExists = await User.findOne({ userName: updateData[key] });
        if (userNameExists) {
          return res.status(400).json({ msg: "Username already exists" });
        }
        else{
          userDataFromDB[key] = updateData[key];
        }
      }
      userDataFromDB[key] = updateData[key];
    }
    const update = await userDataFromDB.save();
    if (!update) {
      return res.status(400).json({ msg: "Failed to update user data" });
    } else {
      res.status(200).json({ msg: "User data updated successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userdata, updateUserData };
