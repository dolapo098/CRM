"use strict";
const { Model } = require("sequelize");

//https://sequelize.org/master/manual/model-basics.html
//This module is used to define the Complaints Workflow  model sequelize use to interact with the db
module.exports = (sequelize, DataTypes) => {
  class Complaints_Workflow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complaints_Workflow.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      initiator: DataTypes.STRING,
      closedBy: DataTypes.STRING,
      attachmentId: DataTypes.STRING,
      comment: DataTypes.STRING,
      client_officer_comment: DataTypes.STRING,
      food_processing_officer_comment: DataTypes.STRING,
      food_taster_comment: DataTypes.STRING,
      salesInvoiceId: DataTypes.STRING,
      closedAt: DataTypes.DATE,
      state: DataTypes.STRING,
      last_action: DataTypes.STRING,
      last_reviewed_by: DataTypes.STRING,
      closedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Complaints_Workflow",
    }
  );
  // Compliants_Workflow.associate = function (models) {
  //   Compliants_Workflow.associate = function (models) {
  //     User.hasOne(models.SalesInvoice, {
  //       foreignKey: "salesInvoiceid",
  //       targetKey: "id",
  //     });
  //   };
  // };
  // associations can be defined here
  return Complaints_Workflow;
};
