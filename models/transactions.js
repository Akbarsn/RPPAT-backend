"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    "Transactions",
    {
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      itemDetail: DataTypes.TEXT,
      forBuyer: DataTypes.STRING,
      forSeller: DataTypes.STRING,
      payment: DataTypes.STRING,
      proof: DataTypes.STRING,
      status: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Transactions.associate = function (models) {};
  return Transactions;
};
