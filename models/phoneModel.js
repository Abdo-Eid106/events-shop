const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Phone = sequelize.define("Phone", {
   value: DataTypes.STRING,
});

module.exports = Phone;
