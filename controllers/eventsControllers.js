const Cart = require(`${__dirname}/../models/cartModel.js`);
const Event = require(`${__dirname}/../models/eventModel.js`);
const EventCart = require(`${__dirname}/../models/eventCartModel.js`);

exports.addToCart = async (req, res, next) => {
   const UserId = req.user.id;
   const EventId = req.params.id;

   const event = await Event.findOne({ where: { id: EventId } });
   let cart = await Cart.findOne({ where: { UserId } });
   if (!cart) cart = await Cart.create({ UserId });

   if (!(await cart.hasEvent(event))) await cart.addEvent(event);

   res.redirect("/events");
};

exports.removeFromCart = async (req, res, next) => {
   const UserId = req.user.id;
   const cart = await Cart.findOne({ where: { UserId } });

   await EventCart.destroy({
      where: { CartId: cart.id, EventId: req.params.id },
   });
   res.redirect("/cart");
};
