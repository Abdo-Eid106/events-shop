const express = require("express");
const router = express.Router();

const userControllers = require(__dirname +
   "/../controllers/userControllers.js");
const authControllers = require(__dirname +
   "/../controllers/authControllers.js");
const profileValidators = require(`${__dirname}/../validators/profileValidators.js`);

router.post(
   "/profile",
   authControllers.isLoggedIn,
   profileValidators,
   userControllers.updateMe
);

module.exports = router;
