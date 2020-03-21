'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    IDcard: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bankAccount: DataTypes.STRING,
    bankNumber: DataTypes.STRING,
    role: DataTypes.INTEGER,
    profilImage: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
  };
  return Users;
};