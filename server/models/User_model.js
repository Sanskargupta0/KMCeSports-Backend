const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide a firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  } else {
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
    } catch (error) {
      next(error);
    }
  }
});

userSchema.methods.generateAuthToken = function () {
  const user = this;
  try {
    const token = jwt.sign(
      { userid: user._id.toString(), email: user.email, isadmin: user.isadmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  try {
    const isMatch = bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
}

const User = mongoose.model("Users", userSchema);

module.exports = User;
