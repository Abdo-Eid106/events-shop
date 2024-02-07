const express = require("express");
const router = express.Router();

const eventsControllers = require(__dirname +
   "/../controllers/eventsControllers.js");
const authControllers = require(__dirname +
   "/../controllers/authControllers.js");

router.post(
   "/:id/cart",
   authControllers.isLoggedIn,
   eventsControllers.addToCart
);

router.delete(
   "/:id/cart",
   authControllers.isLoggedIn,
   eventsControllers.removeFromCart
);

module.exports = router;
