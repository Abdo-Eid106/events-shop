const { DataTypes } = require("sequelize");
const sequelize = require(`${__dirname}/../config/database.js`);

const Otp = sequelize.define("Otp", {
   val: DataTypes.STRING,
   expiresAt: DataTypes.DATE,
});

Otp.beforeCreate(async (otp, options) => {
   otp.expiredAt = new Date(Date.now() + 10 * 60 * 1000);

   while (true) {
      const val = generateRandomOTP();
      if (await Otp.findOne({ where: { val } })) continue;

      otp.val = val;
      break;
   }
});

function generateRandomOTP() {
   return Math.floor(1000 + Math.random() * 9000).toString();
}

module.exports = Otp;
