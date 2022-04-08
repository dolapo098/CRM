"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("Complaints_Workflows", "status", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Complaints_Workflows", "state", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Complaints_Workflows", "closedAt", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Complaints_Workflows", "closedBy", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Complaints_Workflows", "reviewedBy", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
