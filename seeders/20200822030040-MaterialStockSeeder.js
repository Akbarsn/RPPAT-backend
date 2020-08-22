'use strict';
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('MaterialStocks', [
      {
        item: "Natrium Benzoat",
        unit: "Kg",
        qty: 20,
        buyPrice: 5000,
        sellPrice: 8000,
        owner: 2,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Sorbitol",
        unit: "Liter",
        qty: 50,
        buyPrice: 20000,
        sellPrice: 25000,
        owner: 2,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Minyak Goreng",
        unit: "Liter",
        qty: 50,
        buyPrice: 18000,
        sellPrice: 20000,
        owner: 2,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MaterialStocks', null, {});
  }
};
