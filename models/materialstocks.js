'use strict';
module.exports = (sequelize, DataTypes) => {
  const MaterialStocks = sequelize.define('MaterialStocks', {
    item: DataTypes.STRING,
    unit: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    buyPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  MaterialStocks.associate = function(models) {
    models.MaterialStocks.belongsTo(models.Users,{foreignKey:'uid'})
  };
  return MaterialStocks;
};