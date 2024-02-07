module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("carts", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
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
      await queryInterface.dropTable("carts");
   },
};
