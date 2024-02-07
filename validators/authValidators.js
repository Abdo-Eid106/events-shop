const { body } = require("express-validator");
const User = require(`${__dirname}/../models/userModel.js`);

exports.signUp = [
   body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid Email")
      .custom(async (email) => {
         const user = await User.findOne({ where: { email } });
         if (user) throw new Error("Email is already in use");
         return true;
      }),

   body("password")
      .trim()
      .isLength({ min: 8, max: 30 })
      .withMessage("the length of the password should be between 8 and 30"),

   body("phone")
      .trim()
      .isLength({ min: 11, max: 11 })
      .withMessage("the phone number should be of length 11")
      .custom(async (val) => {
         for (const char of val)
            if (isNaN(char - "0"))
               throw new Error("the phone number should contains only digits");

         const valid = ["010", "011", "012"];
         if (valid.indexOf(val.slice(0, 3)) == -1)
            throw new Error("not a phone number");
         return true;
      }),
];

exports.resetPassword = [
   body("password")
      .trim()
      .isLength({ min: 8, max: 30 })
      .withMessage("the length of the password should be between 8 and 30"),
   body("passwordConfirm")
      .trim()
      .custom((val, { req }) => {
         if (val != req.body.password.trim())
            throw new Error(
               "the passwordConfirm should be equal to the password"
            );
         return true;
      }),
];
