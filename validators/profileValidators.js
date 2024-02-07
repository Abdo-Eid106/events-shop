const { body } = require("express-validator");

module.exports = [
   body("firstName")
      .trim()
      .notEmpty()
      .withMessage("the first name of the user is required"),

   body("lastName").trim(),

   body("email")
      .trim()
      .custom(async (val, { req }) => {
         if (val == req.user.email) return true;
         throw new Error("you can't change your email");
      }),

   body("address").trim(),

   body("password")
      .trim()
      .custom(async (val, { req }) => {
         if (val == "") throw new Error("you should provide your password");
         else if (!(await req.user.correctPassword(val)))
            throw new Error("the password in incorrect");
         else return true;
      }),

   body("newPassword")
      .trim()
      .custom((val, { req }) => {
         if (val == "" && req.body.passwordConfirm.trim() == "") return true;
         const len = val.length;
         if (len >= 8 && len <= 30) return true;
         throw new Error(
            "the length of the password should be between 8 and 30"
         );
      }),

   body("passwordConfirm")
      .trim()
      .custom((val, { req }) => {
         if (val == req.body.newPassword.trim()) return true;
         throw new Error(
            "the passwordConfirm should be equal to the newPassword"
         );
      }),
];
