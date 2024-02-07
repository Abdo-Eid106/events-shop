const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Term = sequelize.define("Term", {
   priority: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
   },
   title: {
      type: DataTypes.STRING,
      set(value) {
         const val = value.charAt(0).toUpperCase() + value.slice(1);
         this.setDataValue("title", val);
      },
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
});

module.exports = Term;
