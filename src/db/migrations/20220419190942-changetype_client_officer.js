"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      "Complaints_Workflows",
      "client_officer_comment",
      {
        type: Sequelize.STRING,
      }
    );
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
