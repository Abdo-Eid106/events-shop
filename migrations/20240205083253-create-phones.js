module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("phones", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         value: Sequelize.STRING,
         description: Sequelize.TEXT,
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("phones");
   },
};
