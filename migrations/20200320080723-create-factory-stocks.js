'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FactoryStocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.STRING
      },
      sellPrice: {
        type: Sequelize.INTEGER
      },
      buyPrice: {
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.INTEGER
      },
      type:{
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
    return queryInterface.dropTable('FactoryStocks');
  }
};