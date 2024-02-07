const path = require("path");

const express = require("express");
const app = express();
const ejsLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

require(`${__dirname}/models/relations`);
// const sequelize = require(`${__dirname}/config/database.js`);
const User = require(`${__dirname}/models/userModel.js`);

//serve static files
app.use(express.static(path.join(__dirname, "public")));

//set up template engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(ejsLayouts);

//request logger
app.use(morgan("dev"));
//cookie-parser
app.use(cookieParser());
//body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//get the path of the url
app.use((req, res, next) => {
   res.locals.path = req.originalUrl.split("?")[0];
   next();
});
// get the loggedIn user from the token
app.use(async (req, res, next) => {
   const token = req.cookies.jwt;
   if (!token) return next();
   try {
      const payloud = await jwt.verify(token, process.env.JWTSecret);
      const user = await User.findOne({ where: { id: payloud.id } });
      if (!user) return next();

      req.user = user;
      res.locals.user = user;
      next();
   } catch (err) {
      next();
   }
});

const viewsRoutes = require(`${__dirname}/routes/viewsRoutes.js`);
const authRoutes = require(`${__dirname}/routes/authRoutes.js`);
const userRoutes = require(`${__dirname}/routes/userRoutes.js`);
const messagesRoutes = require(`${__dirname}/routes/messagesRoutes.js`);
const eventsRoutes = require(`${__dirname}/routes/eventsRoutes.js`);
const paymentRoutes = require(`${__dirname}/routes/paymentRoutes.js`);

app.use(authRoutes);
app.use(viewsRoutes);
app.use(userRoutes);
app.use("/messages/", messagesRoutes);
app.use("/events/", eventsRoutes);
app.use("/payments", paymentRoutes);

// sequelize.sync({ force: true }).then(() => {
//   console.log('connecting to the database is done');
// }).catch(err => {
//   console.log(err);
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log("the server is running on port " + PORT);
});
