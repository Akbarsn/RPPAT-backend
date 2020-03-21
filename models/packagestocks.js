'use strict';
module.exports = (sequelize, DataTypes) => {
  const PackageStocks = sequelize.define('PackageStocks', {
    item: DataTypes.STRING,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    buyPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  PackageStocks.associate = function(models) {
    models.PackageStocks.belongsTo(models.Users, {foreignKey:'uid'})
  };
  return PackageStocks;
};