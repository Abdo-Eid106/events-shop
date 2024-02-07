module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("events", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         name: Sequelize.STRING,
         description: Sequelize.TEXT,
         startDate: Sequelize.DATE,
         endDate: Sequelize.DATE,
         country: Sequelize.STRING,
         city: Sequelize.STRING,
         maxMembers: Sequelize.INTEGER,
         membersCount: Sequelize.INTEGER,
         image: Sequelize.STRING,
         price: Sequelize.DECIMAL(10, 2),
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("events");
   },
};
