const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Payment = sequelize.define("Payment", {
   price: {
      type: DataTypes.DECIMAL(10, 2),
   },
   paymentDate: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(Date.now()),
   },
});

module.exports = Payment;
