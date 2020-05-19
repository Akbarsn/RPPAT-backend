"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      forBuyer: {
        type: Sequelize.STRING,
      },
      forSeller: {
        type: Sequelize.STRING,
      },
      from: {
        type: Sequelize.INTEGER,
      },
      to: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      itemDetail: {
        type: Sequelize.TEXT,
      },
      proof: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      payment: {
        type: Sequelize.STRING,
      },
      type: {
        //2 = Bahan Baku, 3 = Kemasan, 4 = Bahan Tambahan, 1 = Produk UMKM
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Transactions");
  },
};
