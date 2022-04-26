"use strict";
const { Model } = require("sequelize");

//https://sequelize.org/master/manual/model-basics.html
//This module is used to define the Sales Invoice model sequelize use to interact with the db

module.exports = (sequelize, DataTypes) => {
  class SalesInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalesInvoice.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      clientId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "SalesInvoice",
    }
  );
  // SalesInvoice.associate = function (models) {
  //   SalesInvoice.belongsTo(models.Product, {
  //     foreignKey: "fk_productid",
  //     targetKey: "id",
  //   });
  // };

  return SalesInvoice;
};
