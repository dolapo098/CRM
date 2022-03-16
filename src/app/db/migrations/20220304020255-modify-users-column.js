"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.changeColumn("Users", "email", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "phoneNumber", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.changeColumn("Users", "firstName", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Users", "lastName", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Users", "role", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.changeColumn("Users", "email", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.changeColumn("Users", "phoneNumber", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.changeColumn("Users", "firstName", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Users", "lastName", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Users", "role", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },
};
