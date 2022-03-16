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
      queryInterface.changeColumn("Complaints_Workflows", "salesInvoiceId", {
        type: Sequelize.INTEGER,
        references: {
          model: "SalesInvoices",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    // return Promise.all([
    //   queryInterface.changeColumn("Compliants_Workflows", "SalesInvoiceId", {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: "SalesInvoices",
    //       key: "id",
    //     },
    //     onUpdate: "CASCADE",
    //     onDelete: "SET NULL",
    //   }),
    // ]);
  },
};
