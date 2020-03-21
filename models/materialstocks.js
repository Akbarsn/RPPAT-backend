'use strict';
module.exports = (sequelize, DataTypes) => {
  const MaterialStocks = sequelize.define('MaterialStocks', {
    mid:DataTypes.INTEGER,
    item: DataTypes.STRING,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    buyPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  MaterialStocks.associate = function(models) {
    MaterialStocks.belongsTo(models.user,{foreignKey:'uid'})
  };
  return MaterialStocks;
};