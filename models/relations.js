const User = require(`${__dirname}/userModel.js`);
const ResetToken = require(`${__dirname}/resetTokenModel.js`);
const Otp = require(`${__dirname}/otpModel.js`);
const Event = require(`${__dirname}/eventModel.js`);
const Cart = require(`${__dirname}/cartModel.js`);
const EventCart = require(`${__dirname}/eventCartModel.js`);
const Order = require(`${__dirname}/orderModel.js`);
const Payment = require(`${__dirname}/paymentModel.js`);

User.hasOne(ResetToken, {
   onDelete: "CASCADE",
});
ResetToken.belongsTo(User);

User.hasOne(Otp, {
   onDelete: "CASCADE",
});
Otp.belongsTo(User);

User.hasOne(Cart, {
   onDelete: "CASCADE",
});
Cart.belongsTo(User);

Event.belongsToMany(Cart, { through: EventCart });
Cart.belongsToMany(Event, { through: EventCart });

Event.hasMany(Order, {
   onDelete: "CASCADE",
});
Order.belongsTo(Event);

Payment.hasMany(Order, {
   onDelete: "CASCADE",
});
Order.belongsTo(Payment);

User.hasMany(Payment, {
   onDelete: "CASCADE",
});
Payment.belongsTo(User);

Event.hasMany(Order, {
   onDelete: "CASCADE",
});
Order.belongsTo(Event);

Payment.hasMany(Order, {
   onDelete: "CASCADE",
});
Order.belongsTo(Payment);
