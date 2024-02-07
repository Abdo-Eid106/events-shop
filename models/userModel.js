const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
   firstName: {
      type: DataTypes.STRING,
      defaultValue: "",
   },
   lastName: {
      type: DataTypes.STRING,
      defaultValue: "",
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   password: {
      type: DataTypes.STRING,
   },
   phone: {
      type: DataTypes.STRING,
   },
   address: {
      type: DataTypes.STRING,
      defaultValue: "",
   },
});

User.beforeSave(async (user, options) => {
   if (user.changed("password"))
      user.password = await bcrypt.hash(user.password, 12);
});

User.prototype.correctPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

module.exports = User;
