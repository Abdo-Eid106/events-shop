module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.removeColumn("phones", "description");
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.addColumn("phones", "description", {
         type: Sequelize.TEXT,
      });
   },
};
