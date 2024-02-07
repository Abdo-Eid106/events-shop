"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("terms", [
         {
            priority: 1,
            title: "First Term",
            description: "Description for the first term.",
         },
         {
            priority: 2,
            title: "Second Term",
            description: "Description for the second term.",
         },
         {
            priority: 3,
            title: "Third Term",
            description: "Description for the third term.",
         },
         {
            priority: 4,
            title: "Fourth Term",
            description: "Description for the fourth term.",
         },
         {
            priority: 5,
            title: "Fifth Term",
            description: "Description for the fifth term.",
         },
         {
            priority: 6,
            title: "Sixth Term",
            description: "Description for the sixth term.",
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("terms", null);
   },
};
