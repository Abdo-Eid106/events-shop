module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn("orders", "booked", {
         type: Sequelize.DATEONLY,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn("orders", "booked", {
         type: Sequelize.DATE,
      });
   },
};
