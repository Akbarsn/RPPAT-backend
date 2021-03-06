require("dotenv").config();
const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const KEY = process.env.JWT_SECRET;

module.exports = {
  async GetPage(req, res, next) {
    const outletId = req.user.outletId;
    try {
      const items = await models.OutletStocks.findAll({
        where: {
          owner: outletId,
        },
      });

      if (items) {
        res.status(200).json({
          message: "Success",
          data: items,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan pada saat membuka page transaksi"
        );
        next(error);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan pada saat membuka page transaksi"
      );
      next(error);
    }
  },

  async PostTransaksi(req, res, next) {
    const { total, items } = req.body;
    const userId = req.user.id;
    const outletId = req.user.outletId;

    try {
      const trans = await models.sequelize.transaction(async (t) => {
        try {
          items.map(async (item) => {
            await models.OutletStocks.decrement(
              "qty",
              {
                by: item.qty,
                where: { id: item.id },
              },
              { transaction: t }
            );
          });

          const selling = await models.POS.create(
            {
              owner: outletId,
              total,
              itemDetail: JSON.stringify(items),
              byCashier: userId,
            },
            { transaction: t }
          );

          return selling;
        } catch (err) {
          console.log(err.message);
        }
      });

      if (trans) {
        res.status(200).json({
          message: "Berhasil",
          data: trans,
        });
      } else {
        res.status(500);
        const error = new Error("Terjadi kesalahan");
        next(error);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },

  async Login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await models.Cashiers.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        try {
          const checkPass = await bcrypt.compare(password, user.password);
          if (checkPass) {
            const payload = {
              id: user.id,
              outletId: user.workingOn,
            };

            const token = await jwt.sign(payload, KEY);

            if (token) {
              req.session.token = token;
              res.status(200).json({
                message: "Success",
                data: user,
                token: token,
              });
            } else {
              res.status(500);
              console.log("token tidak ada");
              const error = new Error("Terjadi kesalahan pada saat login");
              next(error);
            }
          } else {
            res.status(500);
            console.log("password salah");
            const error = new Error("Terjadi kesalahan pada saat login");
            next(error);
          }
        } catch (err) {
          res.status(500);
          const error = new Error("Terjadi kesalahan pada saat login");
          next(error);
        }
      } else {
        res.status(500);
        console.log("username salah");
        const error = new Error("Terjadi kesalahan pada saat login");
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error("Terjadi kesalahan pada saat login");
      next(error);
    }
  },
};
