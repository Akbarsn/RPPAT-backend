'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cashiers = sequelize.define('Cashiers', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    workingOn: DataTypes.INTEGER
  }, {});
  Cashiers.associate = function(models) {
  };
  return Cashiers;
};