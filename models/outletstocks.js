'use strict';
module.exports = (sequelize, DataTypes) => {
  const OutletStocks = sequelize.define('OutletStocks', {
    item: DataTypes.STRING,
    itemImage: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    buyPrice: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  OutletStocks.associate = function (models) {
    models.OutletStocks.belongsTo(models.Users, {
      foreignKey: 'id'
    })
    models.OutletStocks.hasMany(models.Cashiers,{as:'Cashiers'})
  };
  return OutletStocks;
};