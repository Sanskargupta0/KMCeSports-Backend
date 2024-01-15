const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const signupSchema = require("../validator/auth-validator");
const Schema = require("../validator/contact-validator");
const Middleware = require("../middleware/validate-middleware");
const otpSchema = require("../validator/otp-validator");

// two ways to write the same thing
// router.get("/", (req, res) => {
//   res.status(200).send("from the auth-router.js file");
// });
// but this is the preferred way


router
  .route("/register")
  .post(Middleware.validateMiddleware(signupSchema), authControllers.register);
router
  .route("/login")
  .post(authControllers.login);
router
  .route("/validateUser")
  .post(Middleware.emailMiddleware(Schema.emailSchema),Middleware.otpMiddleware(), authControllers.otp);
router
  .route("/validateOtp")
  .post(Middleware.emailMiddleware(otpSchema),Middleware.otpMiddleware(),authControllers.validateOtp);

module.exports = router;
