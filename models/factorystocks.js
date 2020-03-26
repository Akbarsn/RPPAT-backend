'use strict';
module.exports = (sequelize, DataTypes) => {
  const FactoryStocks = sequelize.define('FactoryStocks', {
    item: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    unit: DataTypes.STRING,
    grade: DataTypes.CHAR,
    owner: DataTypes.INTEGER
  }, {});
  FactoryStocks.associate = function(models) {
    models.FactoryStocks.belongsTo(models.Users, {foreignKey:"id"})
  };
  return FactoryStocks;
};