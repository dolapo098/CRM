"use strict"; //https://sequelize.org/master/manual/migrations.html   sequelize migration for tracking changes in the db
module.exports = {
  //The up method dictates how to perform a migration to the db
  async up(queryInterface, Sequelize) {
    // logic for creating a Complaints work flow model and its properties
    await queryInterface.createTable("Complaints_Workflows", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      initiator: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      salesInvoiceId: {
        type: Sequelize.STRING,
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
      client_officer_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      food_processing_officer_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      food_taster_comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachmentId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_reviewed_by: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      closedBy: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      closedAt: {
        allowNull: true,
        type: Sequelize.DATE,
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
