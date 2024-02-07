const express = require("express");
const router = express.Router();

const viewsControllers = require(__dirname +
   "/../controllers/viewsControllers.js");
const authControllers = require(__dirname +
   "/../controllers/authControllers.js");

router.get("/signup", viewsControllers.getSignUp);

router.get("/signin", viewsControllers.getsignin);

router.get("/forgotpassword", viewsControllers.getForgotPassword);

router.get("/otp/:resetToken", viewsControllers.getOtp);

router.get("/resetpassword/:resetToken", viewsControllers.getResetPassword);

router.get("/terms", viewsControllers.getTerms);

router.get("/contact", viewsControllers.getContact);

router.use(authControllers.isLoggedIn);

router.get("/", viewsControllers.getHome);

router.get("/events", viewsControllers.getEvents);

router.get("/events/upcomming", viewsControllers.getUpcommingEvents);

router.get("/events/ending", viewsControllers.getEndingEvents);

router.get("/events/:id", viewsControllers.getEvent);

router.get("/profile", viewsControllers.getProfile);

router.get("/cart", viewsControllers.getCart);

router.get("/checkout", viewsControllers.getCheckout);

router.get("/orders", viewsControllers.getOrders);

router.get("/payments", viewsControllers.getPayments);

module.exports = router;
