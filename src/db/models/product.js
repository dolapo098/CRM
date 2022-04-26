"use strict";
const { Model } = require("sequelize");

//https://www.npmjs.com/package/winston
//This module is used to define the Product model sequelize use to interact with the db
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      barcode: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
