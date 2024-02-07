module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("terms", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         priority: {
            type: Sequelize.INTEGER,
            unqiue: true,
         },
         title: Sequelize.STRING,
         description: Sequelize.TEXT,
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("terms");
   },
};
