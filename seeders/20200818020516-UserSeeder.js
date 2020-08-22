'use strict';
const bcrypt = require('bcryptjs')
const moment = require('moment')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: "Joko",
        fullName: "Joko Sasongko",
        IDCard: "upload/users/test-KTP.png",
        address: "Jalan Mawar",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        phoneNumber: "082123455123",
        email: "joko@gmail.com",
        username: "petani",
        password: bcrypt.hashSync("123", 12),
        bankAccount: "BNI",
        bankNumber: "0688765433_Joko",
        role: 0,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        name: "Budi",
        fullName: "Budi Tabuti",
        IDCard: "upload/users/test-KTP.png",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        address: "Jalan Anggrek",
        username: "kemasan",
        password: bcrypt.hashSync("123", 12),
        bankAccount: "BRI",
        bankNumber: "088299123",
        email: "budi@gmail.com",
        phoneNumber: "082123455123",
        role: 1,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        name: "Siti",
        fullName: "Siti Nurbayah",
        IDCard: "upload/users/test-KTP.png",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        address: "Jalan Melati",
        username: "tambahan",
        password: bcrypt.hashSync("123", 12),
        bankAccount: "BNI",
        bankNumber: "0688765433",
        email: "siti@gmail.com",
        phoneNumber: "082123455123",
        role: 2,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        name: "Joko",
        fullName: "Joko Hadi",
        IDCard: "upload/users/test-KTP.png",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        address: "Jalan Mawar",
        username: "umkm",
        password: bcrypt.hashSync("123", 12),
        bankAccount: "BNI",
        bankNumber: "0688765433",
        email: "joko@gmail.com",
        phoneNumber: "082123455123",
        role: 3,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        name: "Rudi",
        fullName: "Rudi Sasongko",
        IDCard: "upload/users/test-KTP.png",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        address: "Jalan Kedondong",
        username: "outlet",
        password: bcrypt.hashSync("123", 12),
        bankAccount: "BNI",
        bankNumber: "0688765433",
        email: "rudi@gmail.com",
        phoneNumber: "082123455123",
        role: 4,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
      {
        name: "Admin",
        fullName: "Admin",
        IDCard: "upload/users/test-KTP.png",
        birthDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        address: "Jalan",
        username: "admin",
        password: bcrypt.hashSync("admin123", 12),
        bankAccount: "BNI",
        bankNumber: "0688765433",
        email: "admin@gmail.com",
        phoneNumber: "082123455123",
        role: 5,
        profilImage: "upload/users/test-profile.png",
        createdAt: moment().format("YYYY-MM-DD hh:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD hh:mm:ss")
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
