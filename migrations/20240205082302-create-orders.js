module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("orders", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         booked: Sequelize.DATE,
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
         EventId: {
            type: Sequelize.INTEGER,
            references: {
               model: "events",
               key: "id",
            },
         },
         PaymentId: {
            type: Sequelize.INTEGER,
            references: {
               model: "payments",
               key: "id",
            },
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("orders");
   },
};
