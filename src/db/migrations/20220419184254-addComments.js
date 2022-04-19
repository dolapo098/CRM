"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Complaints_Workflows",
        "client_officer_comment",
        {
          type: Sequelize.INTEGER,
        }
      ),
      queryInterface.addColumn("Complaints_Workflows", "food_officer_comment", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("Complaints_Workflows", "food_taster_comment", {
        type: Sequelize.STRING,
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
