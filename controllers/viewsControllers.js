const Event = require(`${__dirname}/../models/eventModel.js`);
const Cart = require(`${__dirname}/../models/cartModel.js`);
const EventCart = require(`${__dirname}/../models/eventCartModel.js`);
const Phone = require(`${__dirname}/../models/phoneModel.js`);
const Email = require(`${__dirname}/../models/emailModel.js`);
const Term = require(`${__dirname}/../models/termModel.js`);
const Order = require(`${__dirname}/../models/orderModel.js`);
const Payment = require(`${__dirname}/../models/paymentModel.js`);
const { Op } = require("sequelize");

const getCartEvents = async (user, events) => {
   const mp = {};
   for (const event of events) mp[event.id] = false;

   const UserId = user.id;
   const cart = await Cart.findOne({ where: { UserId } });
   if (cart)
      for (const event of events)
         if (await cart.hasEvent(event)) mp[event.id] = true;
   return mp;
};

const getOrderedEvents = async (user, events) => {
   const mp = {};
   for (const event of events) mp[event.id] = false;

   const UserId = user.id;
   const payments = await Payment.findAll({ where: { UserId } });
   const paymentIds = payments.map((payment) => payment.id);

   const orders = await Order.findAll({
      where: { PaymentId: { [Op.in]: paymentIds } },
   });
   for (const order of orders) mp[order.EventId] = true;
   return mp;
};

exports.getSignUp = (req, res, next) => {
   return res.render("signup");
};

exports.getsignin = (req, res, next) => {
   return res.render("signin");
};

exports.getHome = async (req, res, next) => {
   const page = +req.query.page || 1;
   const pageSize = 6;
   const offset = (page - 1) * pageSize;

   const { rows: events, count } = await Event.findAndCountAll({
      where: {},
      limit: pageSize,
      offset,
   });
   const pages = Math.ceil(count / pageSize);
   const cart = await getCartEvents(req.user, events);
   const ordered = await getOrderedEvents(req.user, events);

   res.render("home", {
      events,
      cart,
      ordered,
      page,
      pages,
   });
};

exports.getEvents = async (req, res, next) => {
   const page = +req.query.page || 1;
   const pageSize = 6;
   const offset = (page - 1) * pageSize;

   const { rows: events, count } = await Event.findAndCountAll({
      where: {},
      limit: pageSize,
      offset,
   });
   const pages = Math.ceil(count / pageSize);

   const cart = await getCartEvents(req.user, events);
   const ordered = await getOrderedEvents(req.user, events);

   res.render("home", {
      events,
      cart,
      ordered,
      page,
      pages,
   });
};

exports.getEvent = async (req, res, next) => {
   const id = req.params.id;
   const event = await Event.findOne({ where: { id } });
   if (!event) return res.redirect("/");

   const UserId = req.user.id;

   let canBook = true;
   const cart = await Cart.findOne({ where: { UserId } });
   if (cart) {
      if (await cart.hasEvent(event)) canBook = false;
      else {
         const payments = await Payment.findAll({ where: { UserId } });
         const paymentsIds = payments.map((payment) => payment.id);
         const order = await Order.findOne({
            where: { PaymentId: { [Op.in]: paymentsIds }, EventId: id },
         });
         if (order) canBook = false;
      }
   }

   res.render("event", {
      event,
      canBook,
   });
};

exports.getUpcommingEvents = async (req, res, next) => {
   const page = +req.query.page || 1;
   const pageSize = 6;
   const offset = (page - 1) * pageSize;

   const { rows: events, count } = await Event.findAndCountAll({
      where: { startDate: { [Op.gt]: new Date() } },
      limit: pageSize,
      offset,
   });
   const pages = Math.ceil(count / pageSize);

   const cart = await getCartEvents(req.user, events);
   const ordered = await getOrderedEvents(req.user, events);

   res.render("home", {
      events,
      cart,
      ordered,
      page,
      pages,
   });
};

exports.getEndingEvents = async (req, res, next) => {
   const page = +req.query.page || 1;
   const pageSize = 6;
   const offset = (page - 1) * pageSize;

   const { rows: events, count } = await Event.findAndCountAll({
      where: { endDate: { [Op.lt]: new Date() } },
      limit: pageSize,
      offset,
   });
   const pages = Math.ceil(count / pageSize);

   const cart = await getCartEvents(req.user, events);
   const ordered = await getOrderedEvents(req.user, events);

   res.render("home", {
      events,
      cart,
      ordered,
      page,
      pages,
   });
};

exports.getProfile = (req, res, next) => {
   res.render("profile", {
      user: req.user,
   });
};

exports.getForgotPassword = (req, res, next) => {
   res.render("forgotPassword");
};

exports.getOtp = (req, res, next) => {
   res.render("otp");
};

exports.getResetPassword = (req, res, next) => {
   res.render("resetPassword");
};

exports.getTerms = async (req, res, next) => {
   const terms = await Term.findAll({
      where: {},
      order: [["priority", "ASC"]],
   });
   res.render("terms", { terms });
};

exports.getContact = async (req, res, next) => {
   const phones = await Phone.findAll({ where: {} });
   const emails = await Email.findAll({ where: {} });

   res.render("contact", {
      phones,
      emails,
   });
};

exports.getCart = async (req, res, next) => {
   let events = [];

   const UserId = req.user.id;
   const cart = await Cart.findOne({ UserId });
   if (cart) {
      let eventIds = await EventCart.findAll({ where: { CartId: cart.id } });
      eventIds = eventIds.map((event) => event.EventId);
      events = await Event.findAll({ where: { id: { [Op.in]: eventIds } } });
   }

   res.render("cart", {
      events,
   });
};

exports.getCheckout = async (req, res, next) => {
   const UserId = req.user.id;
   const cart = await Cart.findOne({ UserId });

   let eventIds = await EventCart.findAll({ where: { CartId: cart.id } });
   eventIds = eventIds.map((event) => event.EventId);
   let events = await Event.findAll({ where: { id: { [Op.in]: eventIds } } });

   let total = 0;
   for (const event of events) total += parseFloat(event.price);
   total = total.toFixed(2);

   res.render("checkout", {
      events,
      total,
   });
};

exports.getOrders = async (req, res, next) => {
   const orders = await Order.findAll({
      where: {},
      include: [{ model: Event }],
   });
   return res.render("orders", {
      orders,
   });
};

exports.getPayments = async (req, res, next) => {
   const UserId = req.user.id;
   const payments = await Payment.findAll({ where: { UserId } });

   res.render("payments", {
      payments,
   });
};
