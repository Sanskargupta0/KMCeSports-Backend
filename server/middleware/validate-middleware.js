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
const emailMiddleware = (emailSchema) => async (req, res, next) => {
  const data = req.body;
  try {
    const parsedData = await emailSchema.parseAsync(data);
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

module.exports = {validateMiddleware, emailMiddleware , contactMiddleware};
