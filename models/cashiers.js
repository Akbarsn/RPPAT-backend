'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cashiers = sequelize.define('Cashiers', {
    cid:DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {});
  Cashiers.associate = function(models) {
    
  };
  return Cashiers;
};