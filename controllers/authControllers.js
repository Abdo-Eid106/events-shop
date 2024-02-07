const path = require("path");

const User = require(path.join(__dirname, "..", "models", "userModel.js"));
const Otp = require(path.join(__dirname, "..", "models", "otpModel.js"));
const ResetToken = require(path.join(
   __dirname,
   "..",
   "models",
   "resetTokenModel.js"
));
const Email = require(path.join(__dirname, "..", "utils", "Email.js"));

const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);
const jwt = require("jsonwebtoken");

const JWTSecret = process.env.JWTSecret;
const JWTexpiresIn = process.env.JWTexpiresIn;

const signToken = (payloud) =>
   jwt.sign(payloud, JWTSecret, {
      expiresIn: JWTexpiresIn,
   });

exports.postSignUp = async (req, res, next) => {
   let errors = validationResult(req);
   if (!errors.isEmpty()) {
      errors = errors.array();
      const errs = ["", "", "", ""];

      for (const error of errors) {
         const msg = error.msg;
         if (error.path == "name") errs[0] = msg;
         if (error.path == "email") errs[1] = msg;
         else if (error.path == "phone") errs[2] = msg;
         else errs[3] = msg;
      }

      return res.render("signup", {
         data: req.body,
         errors: errs,
      });
   }

   const { name, email, password, phone } = req.body;
   const [firstName, lastName] = name.split(" ");
   const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
   });

   const token = signToken({ id: user.id });
   res.cookie("jwt", token);
   res.redirect("/");
};

exports.postSignIn = async (req, res, next) => {
   const { email, password } = req.body;
   const user = await User.findOne({ where: { email } });

   if (!user || !(await user.correctPassword(password))) {
      return res.render("signin", {
         error: "the email or the password is not Correct",
         email,
         password,
      });
   }

   const token = signToken({
      id: user.id,
   });

   res.cookie("jwt", token);
   res.redirect("/");
};

exports.logOut = (req, res, next) => {
   res.cookie("jwt", "", {
      maxAge: 1,
   });
   res.redirect("/signin");
};

exports.isLoggedIn = async (req, res, next) => {
   if (!req.user) return res.redirect("/signin");
   next();
};

exports.postForgotPassword = async (req, res, next) => {
   const email = req.body.email.trim();
   const user = await User.findOne({ where: { email } });

   if (!user) {
      return res.render("forgotPassword", {
         error: "this email is not belonging to any user",
      });
   }

   try {
      await sequelize.transaction(async (t) => {
         const UserId = user.id;
         await Otp.destroy({ where: { UserId } }, { transaction: t });
         await ResetToken.destroy({ where: { UserId } }, { transaction: t });

         const otp = await Otp.create({ UserId }, { transaction: t });
         const token = await ResetToken.create({ UserId }, { transaction: t });
         await new Email(user).forgotPassword(otp.val);

         res.redirect(`/otp/${token.val}`);
      });
   } catch (err) {
      console.log(err);
      res.redirect("/forgotpassword");
   }
};

exports.postOtp = async (req, res, next) => {
   const resetToken = req.params.resetToken;
   const token = await ResetToken.findOne({
      where: {
         val: resetToken,
         expiresAt: { [Op.gt]: new Date() },
      },
   });

   if (!token) return res.render("otp");
   const UserId = token.UserId;
   const otp = await Otp.findOne({ where: { UserId } });

   if (otp.val != req.body.otp)
      return res.render("otp", { msg: "inCorrect Otp" });
   res.redirect(`/resetpassword/${resetToken}`);
};

exports.postResetPassword = async (req, res, next) => {
   const resetToken = req.params.resetToken;
   const token = await ResetToken.findOne({
      where: {
         val: resetToken,
         expiresAt: { [Op.gt]: new Date() },
      },
   });

   if (!token) return res.redirect("/forgotpassword");

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      let errs = {};
      for (const error of errors.array()) errs[error.path] = error.msg;

      return res.render("resetPassword", {
         errors: errs,
      });
   }

   const { UserId } = token;
   const { password } = req.body;

   try {
      await sequelize.transaction(async (t) => {
         const user = await User.findOne(
            { where: { id: UserId } },
            { transaction: t }
         );
         user.password = password;
         await user.save({ transaction: t });

         await Otp.destroy({ where: { UserId } }, { transaction: t });
         await ResetToken.destroy({ where: { UserId } }, { transaction: t });

         res.redirect("/login");
      });
   } catch (err) {
      res.redirect("/resetpassword");
   }
};
