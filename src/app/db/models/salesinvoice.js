"use strict";
const { Model } = require("sequelize");
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
      clientId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "SalesInvoice",
    }
  );
  SalesInvoice.belongsTo(models.Product, {
    foreignKey: "fk_productid",
    targetKey: "id",
  });
  return SalesInvoice;
};
