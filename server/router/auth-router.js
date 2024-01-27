const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const signupSchema = require("../validator/auth-validator");
const Schema = require("../validator/contact-validator");
const Middleware = require("../middleware/validate-middleware");
const Otp = require("../validator/otp-validator");
const authToken = require("../middleware/auth-token")

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
  .post(Middleware.schemaMiddleware(Schema.emailSchema),Middleware.otpMiddleware(), authControllers.otp);
router
  .route("/validateOtp")
  .post(Middleware.schemaMiddleware(Otp.otpSchema),Middleware.otpMiddleware(),authControllers.validateOtp);
router
  .route("/forgotPassword")
  .post(Middleware.schemaMiddleware(Schema.emailSchema),authControllers.forgotPassword);
router
  .route("/validatePassResetOTP")
  .post(Middleware.schemaMiddleware(Otp.resetOtpSchema),authControllers.validatePassResetOTP);
router
  .route("/loginWithSocialMedia")
  .post(authControllers.loginWithSocialMedia);
router
  .route("/tokenValidation")
  .post(authToken,(req,res)=>{
    res.status(200).json({msg:"Token is valid"})
  });

module.exports = router;
