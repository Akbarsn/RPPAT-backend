'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OutletStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.STRING
      },
      itemImage: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.STRING
      },
      buyPrice: {
        type: Sequelize.INTEGER
      },
      sellPrice: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('OutletStocks');
  }
};