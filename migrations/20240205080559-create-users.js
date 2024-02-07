module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("users", {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         firstName: {
            type: Sequelize.STRING,
            defaultValue: "",
         },
         lastName: {
            type: Sequelize.STRING,
            defaultValue: "",
         },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
         },
         password: {
            type: Sequelize.STRING,
         },
         phone: {
            type: Sequelize.STRING,
         },
         address: {
            type: Sequelize.STRING,
            defaultValue: "",
         },
         createdAt: Sequelize.DATE,
         updatedAt: Sequelize.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("users");
   },
};
