'use strict';
module.exports = (sequelize, DataTypes) => {
  const FarmerStocks = sequelize.define('FarmerStocks', {
    item: DataTypes.STRING,
    grade: DataTypes.CHAR,
    qty: DataTypes.INTEGER,
    buyPrice: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  FarmerStocks.associate = function(models) {
    models.FarmerStocks.belongsTo(models.Users,{foreignKey:'id'})
  };
  return FarmerStocks;
};