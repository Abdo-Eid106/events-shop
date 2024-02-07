const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Email = sequelize.define("Email", {
   value: DataTypes.STRING,
});

module.exports = Email;
