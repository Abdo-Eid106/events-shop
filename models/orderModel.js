const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Order = sequelize.define("Order", {
   booked: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(Date.now()),
   },
});

module.exports = Order;
