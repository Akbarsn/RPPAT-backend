'use strict';
module.exports = (sequelize, DataTypes) => {
  const OutletStocks = sequelize.define('OutletStocks', {
    oid: DataTypes.INTEGER,
    item: DataTypes.STRING,
    itemImage: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    weight: DataTypes.STRING,
    buyPrice: DataTypes.INTEGER,
    sellPrice: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {});
  OutletStocks.associate = function (models) {
    OutletStocks.belongsTo(models.users, {
      foreignKey: 'uid'
    })
    OutletStocks.hasMany(models.cashiers,{as:'Cashiers'})
  };
  return OutletStocks;
};