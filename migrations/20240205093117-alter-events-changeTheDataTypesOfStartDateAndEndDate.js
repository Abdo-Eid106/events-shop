module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn("events", "startDate", {
         type: Sequelize.DATEONLY,
      });

      await queryInterface.changeColumn("events", "endDate", {
         type: Sequelize.DATEONLY,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn("events", "startDate", {
         type: Sequelize.DATE,
      });

      await queryInterface.changeColumn("events", "endDate", {
         type: Sequelize.DATE,
      });
   },
};
