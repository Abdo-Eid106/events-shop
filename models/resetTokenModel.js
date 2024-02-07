const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);
const crypto = require("crypto");

const ResetToken = sequelize.define("token", {
   val: DataTypes.STRING,
   expiresAt: DataTypes.DATE,
});

ResetToken.beforeCreate(async (token, options) => {
   token.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
   token.val = crypto.randomBytes(32).toString("hex");
});

module.exports = ResetToken;
