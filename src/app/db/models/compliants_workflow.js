"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compliants_Workflow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Compliants_Workflow.init(
    {
      initiator: DataTypes.STRING,
      closedBy: DataTypes.STRING,
      attachmentId: DataTypes.STRING,
      comment: DataTypes.STRING,
      salesInvoiceId: DataTypes.INTEGER,
      openedAt: DataTypes.DATE,
      closedAt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Compliants_Workflow",
    }
  );
  Compliants_Workflow.associate = function (models) {
    User.hasOne(models.SalesInvoice, {
      foreignKey: "salesinvoiceid",
      targetKey: "id",
    });
    // associations can be defined here
  };
  return Compliants_Workflow;
};
