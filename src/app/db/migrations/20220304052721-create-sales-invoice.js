"use strict"; //https://sequelize.org/master/manual/migrations.html   sequelize migration for tracking changes in the db
module.exports = {
  //The up method dictates how to perform a migration to the db
  async up(queryInterface, Sequelize) {
    // logic for creating a SalesInvoice model and its properties
    await queryInterface.createTable("SalesInvoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clientId: {
        type: Sequelize.INTEGER,
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
        allowNull: false,
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
