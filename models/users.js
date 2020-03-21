'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    uid:DataTypes.INTEGER,
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    IDcard: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
    bankNumber: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.INTEGER,
    profilImage: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
  };
  return Users;
};