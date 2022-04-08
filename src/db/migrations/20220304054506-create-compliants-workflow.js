"use strict"; //https://sequelize.org/master/manual/migrations.html   sequelize migration for tracking changes in the db
module.exports = {
  //The up method dictates how to perform a migration to the db
  async up(queryInterface, Sequelize) {
    // logic for creating a Complaints work flow model and its properties
    await queryInterface.createTable("Complaints_Workflows", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      initiator: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      salesInvoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SalesInvoices",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachmentId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviewedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      closedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

  //The up method dictates how to perform a migration to the db
  async down(queryInterface, Sequelize) {},
};
