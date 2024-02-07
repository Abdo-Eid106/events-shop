"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("emails", [
         { value: "user1@example.com" },
         { value: "user2@example.com" },
         { value: "user3@example.com" },
         { value: "user4@example.com" },
         { value: "user5@example.com" },
         { value: "user6@example.com" },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("emails", null);
   },
};
