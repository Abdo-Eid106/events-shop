const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Message = sequelize.define("Message", {
   username: DataTypes.STRING,
   phone: DataTypes.STRING,
   email: DataTypes.STRING,
   content: DataTypes.STRING,
});

module.exports = Message;
