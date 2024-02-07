module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("tokens", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         val: Sequelize.STRING,
         expiresAt: Sequelize.DATE,
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
         UserId: {
            type: Sequelize.INTEGER,
            references: {
               model: "users",
               key: "id",
            },
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("tokens");
   },
};
