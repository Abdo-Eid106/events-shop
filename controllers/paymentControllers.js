const Payment = require(`${__dirname}/../models/paymentModel.js`);
const Cart = require(`${__dirname}/../models/cartModel.js`);
const EventCart = require(`${__dirname}/../models/eventCartModel.js`);
const Order = require(`${__dirname}/../models/orderModel.js`);
const stripe = require("stripe")(process.env.stripe_secret_key);
const sequelize = require(`${__dirname}/../config/database.js`);

exports.makePayment = async (req, res, next) => {
   const UserId = req.user.id;

   const cart = await Cart.findOne({ UserId });
   if (!cart) return res.redirect("/payments");
   const events = await cart.getEvents();
   if (events.length == 0) return res.redirect("/payments");

   let price = 0;
   for (const event of events) price += parseFloat(event.price);

   try {
      await sequelize.transaction(async (t) => {
         const payment = await Payment.create(
            { UserId, price },
            { transaction: t }
         );
         const PaymentId = payment.id;

         for (const event of events) {
            await Order.create(
               { PaymentId, EventId: event.id },
               { transaction: t }
            );
            event.membersCount += 1;
            await event.save({ transaction: t });
         }

         await EventCart.destroy(
            { where: { CartId: cart.id } },
            { transaction: t }
         );
      });

      res.redirect("/payments");
   } catch (err) {
      res.redirect("/checkout");
   }
};

exports.makeCheckoutSession = async (req, res, next) => {
   const UserId = req.user.id;
   const cart = await Cart.findOne({ UserId });
   const events = await cart.getEvents();

   let price = 0;
   for (const event of events) price += parseFloat(event.price);

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
         {
            price_data: {
               currency: "usd",
               product_data: {
                  name: "events",
               },
               unit_amount: price * 100,
            },
            quantity: 1,
         },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/payments",
      cancel_url: "http://localhost:3000/checkout",
   });

   return res.json({ id: session.id });
};
