'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FactoryStocks', {
      fid: {
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
      unit: {
        type: Sequelize.STRING,
        allowNull:true,
        defaultValue:null
      },
      grade: {
        type: Sequelize.CHAR(1),
        allowNull:true,
        defaultValue:null
      },
      status: {
        type: Sequelize.CHAR(1)
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
    return queryInterface.dropTable('FactoryStocks');
  }
};