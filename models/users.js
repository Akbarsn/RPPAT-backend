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
  Users.associate = function (models) {
    Users.hasMany(models.FarmerStocks, { foreignKey: 'owner', as: 'apples' })

    Users.hasMany(models.PackageStocks, { foreignKey: 'owner', as: 'packages' })

    Users.hasMany(models.MaterialStocks, { foreignKey: 'owner', as: 'materials' })

    Users.hasMany(models.FactoryStocks, { foreignKey: 'owner', as: 'products' })

  };
  return Users;
};