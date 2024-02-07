module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("messages", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         username: Sequelize.STRING,
         phone: Sequelize.STRING,
         email: Sequelize.STRING,
         content: Sequelize.STRING,
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("messages");
   },
};
