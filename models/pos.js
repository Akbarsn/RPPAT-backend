'use strict';
module.exports = (sequelize, DataTypes) => {
  const POS = sequelize.define('POS', {
    itemDetail: DataTypes.STRING,
    total: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
    byCashier: DataTypes.INTEGER
  }, {});
  POS.associate = function (models) {
    models.POS.hasOne(models.Cashiers, {foreignKey:'id'})
  };
  return POS;
};