const express = require("express");
const router = express.Router();

const paymentControllers = require(__dirname +
   "/../controllers/paymentControllers.js");
const authControllers = require(`${__dirname}/../controllers/authControllers.js`);

router.post("/", authControllers.isLoggedIn, paymentControllers.makePayment);

router.post(
   "/checkout-session",
   authControllers.isLoggedIn,
   paymentControllers.makeCheckoutSession
);

module.exports = router;
