"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Compliants_Workflows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      initiator: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      SalesInvoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachmentIt: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      closedBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      openedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      closedAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Compliants_Workflows");
  },
};
