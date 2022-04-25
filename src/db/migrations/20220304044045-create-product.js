"use strict"; //https://sequelize.org/master/manual/migrations.html   sequelize migration for tracking changes in the db
module.exports = {
  //The up method dictates how to perform a migration to the db
  async up(queryInterface, Sequelize) {
    // logic for creating a Products model and its properties
    await queryInterface.createTable("Products", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      barcode: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  //The up method dictates how to perform a migration to the db
  async down(queryInterface, Sequelize) {},
};
