module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("payments", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         price: Sequelize.DECIMAL(10, 2),
         paymentDate: Sequelize.DATE,
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
      await queryInterface.dropTable("payments");
   },
};
