const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const EventCart = sequelize.define("EventCart", {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
});

module.exports = EventCart;
