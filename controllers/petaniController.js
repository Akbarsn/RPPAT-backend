const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async getHomepage(req, res, next) {
    try {
      let trans = await models.sequelize.transaction(async (t) => {
        const allStock = await models.FarmerStocks.findAll(
          {
            where: {
              owner: req.user.id,
            },
          },
          { transaction: t }
        );
        const history = await models.Transactions.findAll(
          {
            where: {
              from: req.user.id,
            },
          },
          { transaction: t }
        );

        return { allStock, history };
      });

      let selling = 0;
      trans.history.map((transaction) => {
        selling += transaction.total;
      });

      trans = { ...trans, selling };

      if (trans) {
        res.status(200).json({
          message: "Success",
          data: trans,
        });
      } else {
        res.status(500);
        const error = new Error("Can't get homepage");
        next(error);
      }
    } catch (err) {
      res.status(500);
      console.log(err.message);
      const error = new Error("Can't get homepage");
      next(error);
    }
  },

  async getLaporanPenjualan(req, res, next) {
    // const reqMonth = req.params.month
    // const reqYear = req.params.year

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth());
    const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    try {
      const sell = await models.Transactions.findAll({
        where: {
          from: req.user.id,
          createdAt: {
            [Op.lte]: nexMonth,
            [Op.gte]: prevMonth,
          },
        },
      });

      if (sell) {
        res.status(200).json({
          message: "Success",
          data: sell,
        });
      } else {
        res.status(500);
        console.log(sell);
        const err = new Error("Can't get laporan penjualan");
        next(err);
      }
    } catch (error) {
      res.status(500);
      console.log(error);
      const err = new Error("Can't get laporan penjualan");
      next(err);
    }
  },

  async getLaporanStokPanen(req, res, next) {
    // const reqMonth = req.params.month
    // const reqYear = req.params.year

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth());
    const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    try {
      const stock = await models.FarmerStocks.findAll({
        where: {
          owner: req.user.id,
          createdAt: {
            [Op.lte]: nexMonth,
            [Op.gte]: prevMonth,
          },
        },
      });

      if (stock) {
        res.status(200).json({
          message: "Success",
          data: stock,
        });
      } else {
        res.status(500);
        console.log(stock);
        const err = new Error("Can't get laporan stok panen");
        next(err);
      }
    } catch (error) {
      res.status(500);
      console.log(error);
      const err = new Error("Can't get laporan stok panen");
      next(err);
    }
  },

  async postStokPanen(req, res, next) {
    const { item, grade, qty, price, unit } = req.body;
    const userId = req.user.id;

    if (!(item && grade && qty && price && unit)) {
      res.status(406);
      const err = new Error("Field still empty");
      next(err);
    }
    try {
      let find = await models.FarmerStocks.findOne({
        where: {
          item: item,
          grade: grade,
          unit: unit,
          price: price,
          owner: userId,
        },
      });

      let stock;
      if (find === null) {
        stock = await models.FarmerStocks.create({
          item,
          grade,
          qty,
          price,
          unit,
          owner: userId,
        });
      } else {
        stock = await models.FarmerStocks.increment("qty", {
          by: qty,
          where: {
            id: find.id,
          },
        });
      }

      if (stock) {
        res.status(200).json({
          message: "Success",
          data: find === null ? stock : find,
        });
      } else {
        res.status(500);
        const err = new Error("Can't add stok panen");
        next(err);
      }
    } catch (error) {
      res.status(500);
      console.log(error.message);
      const err = new Error("Cant add stok panen");
      next(err);
    }
  },

  async getLihatStok(req, res, next) {
    try {
      const stocks = await models.FarmerStocks.findAll({
        where: { owner: req.user.id },
      });

      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const error = new Error("Terjadi kegagalan membuka lihat stok");
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error("Terjadi kegagalan membuka lihat stok");
      next(error);
    }
  },

  async getRiwayat(req, res, next) {
    try {
      const history = await models.Transactions.findAll({
        where: {
          from: req.user.id,
        },
      });

      if (history) {
        res.status(200).json({
          message: "success",
          data: history,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan saat membuka riwayat transaksi"
        );
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan saat membuka riwayat transaksi"
      );
      next(error);
    }
  },

  async KonfirmasiPembayaran(req, res, next) {
    const { id } = req.body;

    try {
      const order = await models.Transactions.update(
        { status: 2 },
        { where: { id: id } }
      );

      if (order) {
        const items = await models.Transactions.findOne({ where: { id: id } });

        const isChanged = await models.sequelize.transaction(async (t) => {
          JSON.parse(items.itemDetail).map(async (item) => {
            await models.FarmerStocks.decrement(
              "qty",
              {
                by: item.qty,
                where: {
                  id: item.id,
                },
              },
              { transaction: t }
            );
          });

          return true;
        });

        if (isChanged) {
          res.status(200).json({
            message: "Success",
            data: items,
          });
        } else {
          res.status(500);
          const err = new Error(
            "Terjadi kesalahan dalam konfirmasi pembayaran"
          );
          next(err);
        }
      } else {
        res.status(500);
        const err = new Error("Terjadi kesalahan dalam konfirmasi pembayaran");
        next(err);
      }
    } catch (error) {
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam konfirmasi pembayaran");
      next(err);
    }
  },

  async PostEditStok(req, res, next) {
    const { id, item, unit, qty, grade, price } = req.body;

    try {
      const stock = await models.PackageStocks.update(
        {
          item: item,
          unit: unit,
          qty: qty,
          grade: grade,
          price: price,
        },
        {
          where: {
            id: id,
          },
        }
      );

      if (stock) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(500);
        const error = new Error("Terjadi kesalahan");
        next(error);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },

  async GetNotification(req, res, next) {
    const userId = req.user.id;

    try {
      const notif = await models.Transactions.findAll({
        where: {
          from: userId,
          [Op.not]: {
            status: 3,
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      let i = 0;
      notif.map((item) => {
        if (
          (item.from == userId && item.status == 2) ||
          (item.from == userId && item.status == 0)
        ) {
          notif.splice(i, 1);
        }
        i++;
      });

      if (notif) {
        res.status(200).json({
          message: "Success",
          data: notif,
        });
      } else {
        res.status(500);
        const error = new Error("Terjadi kesalahan");
        next(error);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },
};
