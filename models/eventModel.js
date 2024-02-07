const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);
const formatDate = require(`${__dirname}/../utils/formatDate.js`);

const Event = sequelize.define(
   "Event",
   {
      name: {
         type: DataTypes.STRING,
      },
      description: {
         type: DataTypes.STRING,
      },
      startDate: {
         type: DataTypes.DATEONLY,
      },
      endDate: {
         type: DataTypes.DATEONLY,
      },
      country: {
         type: DataTypes.STRING,
      },
      city: {
         type: DataTypes.STRING,
      },
      maxMembers: {
         type: DataTypes.INTEGER,
      },
      membersCount: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      image: {
         type: DataTypes.STRING,
         defaultValue: "/assets/images/events/event-1.jpg",
      },
      price: {
         type: DataTypes.DECIMAL(10, 2),
      },
   },
   {
      virtuals: {
         startDateFormated: {
            type: DataTypes.STRING,
            get() {
               return formatDate(this.getDataValue("startDate"));
            },
         },
         endDateFormated: {
            type: DataTypes.STRING,
            get() {
               return formatDate(this.getDataValue("endDate"));
            },
         },
      },
   }
);

module.exports = Event;
