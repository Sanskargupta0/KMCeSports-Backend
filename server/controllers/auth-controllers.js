const User = require("../models/User_model");
const Otp = require("../models/Otp_model");
const sendMail = require("../utils/sendmail");

const register = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      res.status(400).json({ msg: "user already exists" });
    } else {
      const userCreated = await User.create({
        userName,
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
      });
      res.status(201).json({
        msg: "registation successful",
        token: await userCreated.generateAuthToken(),
        userid: userCreated._id.toString(),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      res.status(400).json({ msg: "Invalid Credentials" });
    } else {
      const isMatch = await userExists.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ msg: "Invalid email or password Credentials" });
      } else {
        res.status(200).json({
          msg: "login successful",
          token: await userExists.generateAuthToken(),
          userid: userExists._id.toString(),
        });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const otp = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email.toLowerCase() });
    if (!findUser) {
      res
        .status(400)
        .json({ msg: "User not found \n Please Register yourself" });
    } else {
      const validate = await Otp.findOne({ email: email.toLowerCase() });
      if (validate) {
        res
          .status(400)
          .json({ msg: "OTP already sent \n Please check your email" });
      } else {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const otpCreated = await Otp.create({
          email: email.toLowerCase(),
          otp: otp,
        });
        const mailSent = await sendMail(email, "user", findUser.firstName , otp);
        if (otpCreated && mailSent) {
          res.status(200).json({
            msg: "OTP sent successfully",
            extraD: "Please check your email"
          });
        } else {
          res.status(400).json({ msg: "OTP generation failed" });
        }
      }
    }
  } catch (error) {
    err = {
      msg: "OTP generation failed",
      status: 500,
      extraD: error,
    };
  }
};

const validateOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const userExists = await Otp.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      res
        .status(400)
        .json({ msg: "User not found \n Please Register yourself" });
    } else {
      if (userExists.attempt === 3) {
        const curentDate = Date();
        const otpCreationDate = userExists.date;
        const timeDiff = timeDifference(otpCreationDate, curentDate);
        if (timeDiff) {
          await Otp.updateOne({ attempt: 0, date: Date() });
          res.status(200).json({
            msg: "Attempt reset successfully",
            extraD: "Please try again",
          });
        } else {
          res.status(400).json({
            msg: "OTP validation failed please try again after 1 hours",
          });
        }
      } else {
        if (userExists.otp === otp) {
          const deleted = await Otp.deleteOne({
            email: email.toLowerCase(),
          });
          if (deleted) {
            const verfiy = await User.updateOne({ isVerified: true });
            if (verfiy) {
              res.status(200).json({
                msg: "OTP validation successful",
              });
            } else {
              res.status(400).json({
                msg: "OTP validation failed to uptade user Status please try again",
              });
            }
          } else {
            res
              .status(400)
              .json({ msg: "OTP validation failed/delete please try again" });
          }
        } else {
          const attempt = userExists.attempt + 1;
          const updateAttempt = await Otp.updateOne({ attempt: attempt });
          if (updateAttempt) {
            res.status(400).json({
              msg: "Invalid OTP validation failed please try again",
              extraD: `attempt left ${3 - attempt} out of 3`,
            });
          } else {
            res.status(400).json({
              msg: "validation failed please try again",
              extraD: "attempt update failed",
            });
          }
        }
      }
    }
  } catch (error) {
    err = {
      msg: "OTP validation failed",
      status: 500,
      extraD: error,
    };
  }
};

function timeDifference(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const timeDifference = Math.abs(date2 - date1);
  if (timeDifference > 3600000) {
    return true;
  } else {
    return false;
  }
}

module.exports = { login, register, otp, validateOtp };
