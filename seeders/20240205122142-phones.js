"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("phones", [
         { value: "+1234567890" },
         { value: "+9876543210" },
         { value: "+1122334455" },
         { value: "+9988776655" },
         { value: "+5544332211" },
         { value: "+6677889900" },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("phones", null);
   },
};
