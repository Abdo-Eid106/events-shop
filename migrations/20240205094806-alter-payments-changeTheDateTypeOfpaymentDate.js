module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn("payments", "paymentDate", {
         type: Sequelize.DATEONLY,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn("payments", "paymentDate", {
         type: Sequelize.DATE,
      });
   },
};
