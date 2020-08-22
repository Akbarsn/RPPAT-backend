'use strict';
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FarmerStocks', [
      {
        item: "Apel Fuji",
        grade: "A",
        qty: 100,
        buyPrice: 15000,
        sellPrice: 18000,
        unit: "Kilogram",
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Apel Manalagi",
        grade: "A",
        qty: 50,
        buyPrice: 12000,
        sellPrice: 15000,
        unit: "Kilogram",
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Ape Fuji",
        grade: "B",
        qty: 120,
        buyPrice: 13000,
        sellPrice: 15000,
        unit: "Kilogram",
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FarmerStocks', null, {});
  }
};
