"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SalesInvoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SalesInvoices");
  },
};
