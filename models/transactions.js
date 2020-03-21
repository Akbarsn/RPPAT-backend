'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    tid:DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    type: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    detail: DataTypes.TEXT,
    paymentProof: DataTypes.STRING
  }, {});
  Transactions.associate = function(models) {
  };
  return Transactions;
};