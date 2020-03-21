'use strict';
module.exports = (sequelize, DataTypes) => {
  const FarmerStocks = sequelize.define('FarmerStocks', {
    fid:DataTypes.INTEGER,
    item: DataTypes.STRING,
    grade: DataTypes.CHAR,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    owner: DataTypes.INTEGER
  }, {});
  FarmerStocks.associate = function(models) {
    FarmerStocks.belongsTo(models.users,{foreignKey:'uid'})
  };
  return FarmerStocks;
};