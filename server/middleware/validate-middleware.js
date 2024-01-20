const User = require("../models/User_model");
const validateMiddleware = (signupSchema) => async (req, res, next) => {
  const data = req.body;
  try {
    const parsedData = await signupSchema.parseAsync(data);
    req.body = parsedData;
    next();
  } catch (error) {
    const err = {
      status: 422,
      msg: "Please fill the registration form Properly ",
      extraD: error.errors[0].message,
    };
    next(err);
  }
};
const contactMiddleware = (contactSchema) => async (req, res, next) => {
  const data = req.body;
  try {
    const parsedData = await contactSchema.parseAsync(data);
    req.body = parsedData;
    next();
  } catch (error) {
    const err = {
      status: 422,
      msg: "Please fill the contact form Properly ",
      extraD: error.errors[0].message,
    };
    next(err);
  }
};
const schemaMiddleware = (schema) => async (req, res, next) => {
  const data = req.body;
  try {
    const parsedData = await schema.parseAsync(data);
    req.body = parsedData;
    next();
  } catch (error) {
    const err = {
      status: 422,
      msg: "Please fill the email Properly ",
      extraD: error.errors[0].message,
    };
    next(err);
  }
};

const otpMiddleware = () => async (req, res, next) => {
  try {
    const Userstate = await User.findOne({ email: req.body.email.toLowerCase() });
    const isVerfied = Userstate.isVerified;
    if (isVerfied) {
      res.status(200).json({ msg: "You are already Verfied" });
    } else {
      next();
    }
  } catch (error) {
    const err = {
      status: 422,
      msg: "You are not registered"
    };
    next(err);
  }
};

module.exports = {
  validateMiddleware,
  schemaMiddleware,
  contactMiddleware,
  otpMiddleware,
};
