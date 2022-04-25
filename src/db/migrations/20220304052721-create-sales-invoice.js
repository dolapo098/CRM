"use strict"; //https://sequelize.org/master/manual/migrations.html   sequelize migration for tracking changes in the db
module.exports = {
  //The up method dictates how to perform a migration to the db
  async up(queryInterface, Sequelize) {
    // logic for creating a SalesInvoice model and its properties
    await queryInterface.createTable("SalesInvoices", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      productId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  //The up method dictates how to perform a migration to the db
  async down(queryInterface, Sequelize) {},
};
