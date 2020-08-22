'use strict';
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PackageStocks', [
      {
        item: "Kemasan plastik 4x4 Cm",
        unit: "Lembar",
        qty: 1000,
        buyPrice: 200,
        sellPrice: 500,
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Kemasan Plastik 10x10 Cm",
        unit: "Lembar",
        qty: 200,
        buyPrice: 500,
        sellPrice: 700,
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        item: "Kemasan Kardus 50x50 Cm",
        unit: "Lembar",
        qty: 100,
        buyPrice: 1500,
        sellPrice: 2000,
        owner: 1,
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PackageStocks', null, {});
  }
};
