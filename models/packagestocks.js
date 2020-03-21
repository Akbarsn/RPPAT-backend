'use strict';
module.exports = (sequelize, DataTypes) => {
  const PackageStocks = sequelize.define('PackageStocks', {
    pid:DataTypes.INTEGER,
    item: DataTypes.STRING,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    buyPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  PackageStocks.associate = function(models) {
    // associations can be defined here
  };
  return PackageStocks;
};