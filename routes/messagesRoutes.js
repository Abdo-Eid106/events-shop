const express = require("express");
const router = express.Router();

const messageControllers = require(__dirname +
   "/../controllers/messageControllers.js");

router.post("/", messageControllers.addMessage);

module.exports = router;
