const express = require("express");
const router = express.Router();

const authControllers = require(__dirname +
   "/../controllers/authControllers.js");
const authValidators = require(`${__dirname}/../validators/authValidators`);

router.post("/signup", authValidators.signUp, authControllers.postSignUp);

router.post("/signin", authControllers.postSignIn);

router.post("/logout", authControllers.logOut);

router.post("/forgotpassword", authControllers.postForgotPassword);

router.post("/otp/:resetToken", authControllers.postOtp);

router.post(
   "/resetpassword/:resetToken",
   authValidators.resetPassword,
   authControllers.postResetPassword
);

module.exports = router;
