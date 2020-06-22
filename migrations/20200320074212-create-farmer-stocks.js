'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FarmerStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.CHAR(1)
      },
      qty: {
        type: Sequelize.INTEGER
      },
      sellPrice: {
        type: Sequelize.INTEGER
      },
      buyPrice: {
        type: Sequelize.INTEGER,
      },
      unit: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FarmerStocks');
  }
};