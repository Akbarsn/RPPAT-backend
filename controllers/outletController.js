const models = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = {
  async getHomepage(req, res, next) {
    try {
      let trans = await models.sequelize.transaction(async (t) => {
        const allStock = await models.OutletStocks.findAll(
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
              to: req.user.id,
            },
          },
          { transaction: t }
        );

        const pos = await models.POS.findAll(
          {
            where: {
              owner: req.user.id,
            },
          },
          { transaction: t }
        );

        return { allStock, history, pos };
      });

      let buying = 0;
      trans.history.map((transaction) => {
        buying += transaction.total;
      });

      let selling = 0;
      trans.pos.map((transaction) => {
        selling += transaction.total;
      });

      trans = { ...trans, buying, selling };

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
      const sell = await models.POS.findAll({
        where: {
          owner: req.user.id,
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

  async getLaporanPembelian(req, res, next) {
    // const reqMonth = req.params.month
    // const reqYear = req.params.year

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth());
    const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    try {
      const stock = await models.Transactions.findAll({
        where: {
          to: req.user.id,
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
        const err = new Error("Can't get laporan stok kemasan");
        next(err);
      }
    } catch (error) {
      res.status(500);
      console.log(error);
      const err = new Error("Can't get laporan stok kemasan");
      next(err);
    }
  },

  async getLihatStok(req, res, next) {
    try {
      const stocks = await models.OutletStocks.findAll({
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
    const userId = req.user.id;
    try {
      const history = await models.Transactions.findAll({
        where: {
          to: req.user.id,
          status: 3,
        },
      });

      const pos = await models.POS.findAll({
        where: {
          owner: userId,
        },
      });

      if (history) {
        res.status(200).json({
          message: "success",
          data: { history, pos },
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

  async getBeliProduk(req, res, next) {
    try {
      const stocks = await models.Users.findAll({
        where: {
          role: 3,
        },
        include: "products",
      });

      const stores = [...stocks];

      stores.map((store) => {
        let i = 0;

        let temp = [...store.products];
        temp.map((item) => {
          if (item.type == 1) {
            store.products.splice(i, 1);
          } else {
            i++;
          }
        });
      });

      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan saat membukan halaman Beli Produk UMKM"
        );
        next(error);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan saat membukan halaman Beli Produk UMKM"
      );
      next(error);
    }
  },

  async getDetailToko(req, res, next) {
    const id = req.params.shopID;
    try {
      const stocks = await models.Users.findByPk(id, { include: "products" });

      let temp = [...stocks.products];
      let i = 0;
      temp.map((item) => {
        if (item.type == 1) {
          stocks.products.splice(i, 1);
        } else {
          i++;
        }
      });

      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const err = new Error(
          "Terjadi kesalahan dalam membuka page Detail Toko"
        );
        next(err);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam membuka page Detail Toko");
      next(err);
    }
  },

  async PesanProduk(req, res, next) {
    const { from, total, items, banks, forBuyer, forSeller } = req.body;
    const type = 4;

    try {
      const order = await models.Transactions.create({
        from,
        to: req.user.id,
        total,
        forBuyer,
        forSeller,
        itemDetail: JSON.stringify(items),
        payment: banks,
        proof: "",
        status: 0,
        type:4
      });

      if (order) {
        res.status(200).json({
          message: "Success",
          data: order,
        });
      } else {
        res.status(500);
        const err = new Error("Terjadi kesalahan dalam melakukan beli bahan");
        next(err);
      }
    } catch (error) {
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam melakukan beli bahan");
      next(err);
    }
  },

  async BayarTransaksi(req, res, next) {
    const { id } = req.body;
    try {
      const order = await models.Transactions.update(
        { status: 1, proof: req.file.path },
        { where: { id: id } }
      );

      if (order) {
        res.status(200).json({
          message: "Success",
          data: order,
        });
      } else {
        res.status(500);
        const err = new Error("Terjadi kesalahan dalam melakukan pembayaran");
        next(err);
      }
    } catch (error) {
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam melakukan pembayaran");
      next(err);
    }
  },

  async KonfirmasiPenerimaan(req, res, next) {
    const { id } = req.body;
    const userId = req.user.id;

    try {
      const trans = await models.Transactions.findOne({
        where: {
          id: id,
        },
      });

      const items = JSON.parse(trans.itemDetail);
      const t = await models.sequelize.transaction();

      try {
        let n = 0;
        console.log(items);
        console.log(items.length);
        for (let i = 0; i < items.length; i++) {
          const find = await models.OutletStocks.findOne({
            where: {
              item: items[i].item,
              weight: items[i].unit,
              buyPrice: items[i].price,
              sellPrice: items[i].price,
            },
          });

          if (find) {
            const changed = await models.OutletStocks.increment("qty", {
              by: items[i].qty,
              where: {
                id: find.id,
              },
            });
            if (changed) {
              console.log("changed");
              n++;
            } else {
              console.log("rollback");
              await t.rollback();
            }
          } else {
            const changed = await models.OutletStocks.create({
              item: items[i].item,
              qty: items[i].qty,
              weight: items[i].unit,
              sellPrice: items[i].price,
              buyPrice: items[i].price,
              itemImage: "",
              owner: userId,
            });

            if (changed) {
              console.log("changed");
              n++;
            } else {
              console.log("rollback");
              await t.rollback();
            }
          }
        }

        if (n == items.length) {
          console.log("Commited");

          const update = await models.Transactions.update(
            { status: 3 },
            {
              where: {
                id: id,
              },
            }
          );

          if (update) {
            await t.commit();
            res.status(200).json({ message: "Success" });
          } else {
            res.status(500);
            const error = new Error(
              "Terjadi error saat melakukan update order"
            );
            next(error);
          }
        } else {
          res.status(500);
          const error = new Error(
            "Terjadi error saat melakukan penambahan stok"
          );
          next(error);
        }
      } catch (err) {
        res.status(500);
        console.log(err.message);
        const error = new Error("Terjadi error saat melakukan penambahan stok");
        next(error);
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      const error = new Error("Terjadi error saat mencari transaksi");
      next(error);
    }
  },

  async GetTambahKasir(req, res, next) {
    const userId = req.user.id;
    try {
      const cashiers = await models.Cashiers.findAll({
        where: {
          workingOn: userId,
        },
      });

      if (cashiers) {
        res.status(200).json({
          message: "Success",
          data: cashiers,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan dalam mengambil data kasir 1"
        );
        next(error);
      }
    } catch (err) {
      res.status(500);
      console.log(err.message);
      const error = new Error("Terjadi kesalahan dalam mengambil data kasir 2");
      next(error);
    }
  },

  async TambahKasir(req, res, next) {
    const { username, password, fullName } = req.body;
    const outletId = req.user.id;

    try {
      const hashed = await bcrypt.hash(password, 12);

      const cashier = await models.Cashiers.create({
        username,
        password: hashed,
        fullName,
        workingOn: outletId,
      });

      if (cashier) {
        res.status(200).json({
          message: "Success",
          data: cashier,
        });
      } else {
        res.status(500);
        const err = new Error("Terjadi kesalahan dalam menambah kasir");
        next(err);
      }
    } catch (error) {
      res.status(500);
      console.log(error);
      const err = new Error("Terjadi kesalahan dalam menambah kasir");
      next(err);
    }
  },

  async PostEditStok(req, res, next) {
    const { id, weight, qty, sellPrice } = req.body;
    const image = req.file.path;

    try {
      const stock = await models.OutletStocks.update(
        {
          weight: weight,
          qty: qty,
          sellPrice: sellPrice,
          itemImage: image,
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
          data: stock,
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
          [Op.or]: {
            from: userId,
            to: userId,
          },
          [Op.not]: {
            status: 3,
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      const before = [...notif];
      let i = 0;
      before.map((item) => {
        if (item.status == 1 && item.to == userId) {
          notif.splice(i, 1);
        } else if (
          (item.status == 0 && item.from == userId) ||
          (item.status == 2 && item.from == userId)
        ) {
          notif.splice(i, 1);
        } else {
          i++;
        }
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
