"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.removeColumn("Complaints_Workflows", "openedAt"),
      queryInterface.addColumn("Complaints_Workflows", "dateClosed", {
        type: Sequelize.DATE,
        allowNull: true,
      });
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
