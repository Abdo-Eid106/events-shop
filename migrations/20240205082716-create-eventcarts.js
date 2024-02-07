module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("eventcarts", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
         EventId: {
            type: Sequelize.INTEGER,
            references: {
               model: "events",
               key: "id",
            },
         },
         CartId: {
            type: Sequelize.INTEGER,
            references: {
               model: "carts",
               key: "id",
            },
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("eventcarts");
   },
};
