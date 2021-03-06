const models = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async getHomepage(req, res, next) {
    const userId = req.user.id;
    try {
      let trans = await models.sequelize.transaction(async (t) => {
        const allStock = await models.FactoryStocks.findAll(
          {
            where: {
              owner: req.user.id,
              type: 1,
            },
          },
          { transaction: t }
        );
        const history = await models.Transactions.findAll(
          {
            where: {
              [Op.or]: {
                from: userId,
                to: userId,
              },
            },
          },
          { transaction: t }
        );

        return { allStock, history };
      });

      let buying = 0;
      trans.history.map((transaction) => {
        if (transaction.to == userId) {
          buying += transaction.total;
        }
      });

      let selling = 0;
      trans.history.map((transaction) => {
        if (transaction.from == userId) {
          selling += transaction.total;
        }
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

  async getLaporanPembelian(req, res, next) {
    // const reqMonth = req.params.month
    // const reqYear = req.params.year

    // const now = new Date();
    // const prevMonth = new Date(now.getFullYear(), now.getMonth());
    // const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    try {
      // const transaction = await models.Transactions.findAll({
      //   where: {
      //     to: req.user.id,
      //     createdAt: {
      //       [Op.lte]: nexMonth,
      //       [Op.gte]: prevMonth,
      //     },
      //     status: 3,
      //   },
      // });

      const transaction = await models.Transactions.findAll({
        where: {
          to: req.user.id,
          status: 3
        }
      })

      if (transaction) {
        res.status(200).json({
          message: "Success",
          data: transaction,
        });
      } else {
        res.status(500);
        console.log(transaction);
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

  async getLaporanProduksi(req, res, next) {
    // const reqMonth = req.params.month
    // const reqYear = req.params.year
    const userId = req.user.id;

    // const now = new Date();
    // const prevMonth = new Date(now.getFullYear(), now.getMonth());
    // const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2);

    try {
      // const stocks = await models.FactoryStocks.findAll({
      //   where: {
      //     owner: userId,
      //     createdAt: {
      //       [Op.lte]: nexMonth,
      //       [Op.gte]: prevMonth,
      //     },
      //     type: 1,
      //   },
      // });

      const stocks = await models.FactoryStocks.findAll({
        where: {
          owner: userId,
          type: 1
        }
      })

      const materials = await models.FactoryStocks.findAll({
        where: {
          owner: userId,
          type: {
            [Op.in]: [2, 3, 4],
          },
        },
      });

      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: { stocks, materials },
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

  async postDataProduksi(req, res, next) {
    const { item, qty, buyPrice, sellPrice, weight, materials } = req.body;
    const userId = req.user.id;
    const type = 1;

    if (!(item && qty && buyPrice && sellPrice && weight)) {
      res.status(406);
      const err = new Error("Field still empty");
      next(err);
    }
    try {
      const t = await models.sequelize.transaction();

      try {
        let n = 0;
        let reduceDone = false;
        let createDone = false;
        materials.map(async (material) => {
          const reduced = await models.FactoryStocks.decrement("qty", {
            by: material.qty,
            where: {
              id: material.id,
            },
            transaction: t,
          });
          if (reduced) {
            n++;
          } else {
            reduceDone = false;
          }
        });

        reduceDone = true;

        let find = await models.FactoryStocks.findOne(
          {
            where: {
              item: item,
              weight: weight,
              buyPrice: buyPrice,
              sellPrice: sellPrice,
              owner: userId,
              type: type,
            },
          },
          { transaction: t }
        );

        let stock;
        if (find === null) {
          stock = await models.FactoryStocks.create(
            {
              item,
              qty,
              weight,
              buyPrice,
              sellPrice,
              owner: userId,
              type,
            },
            { transaction: t }
          );
        } else {
          stock = await models.FactoryStocks.increment(
            "qty",
            {
              by: qty,
              where: {
                id: find.id,
              },
            },
            { transaction: t }
          );
        }

        if (stock) {
          createDone = true;
        } else {
          throw new Error("Gagal dalam menambah produk bahan");
        }

        if (createDone && reduceDone) {
          await t.commit();
          res.status(200).json({
            message: "success",
            data: stock,
          });
        } else {
          await t.rollback()
        }
      } catch (err) {
        console.log(err.message);
        await t.rollback();
        res.status(500);
        const error = new Error("Gagal didalam transaction");
        next(error);
      }
    } catch (error) {
      res.status(500);
      console.log(error.message);
      const err = new Error("Cant add stok panen");
      next(err);
    }
  },

  async getLihatStokBahanBaku(req, res, next) {
    try {
      const stocks = await models.FactoryStocks.findAll({
        where: {
          owner: req.user.id,
          type: 2,
        },
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

  async getLihatStokKemasan(req, res, next) {
    try {
      const stocks = await models.FactoryStocks.findAll({
        where: {
          owner: req.user.id,
          type: 3,
        },
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

  async getLihatStokBahanTambahan(req, res, next) {
    try {
      const stocks = await models.FactoryStocks.findAll({
        where: {
          owner: req.user.id,
          type: 4,
        },
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

  async getLihatStokProduk(req, res, next) {
    try {
      const stocks = await models.FactoryStocks.findAll({
        where: {
          owner: req.user.id,
          type: 1,
        },
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
          [Op.or]: {
            from: req.user.id,
            to: req.user.id,
          },
          status: 3,
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

  async getBeliBahanPetani(req, res, next) {
    try {
      const stocks = await models.Users.findAll({
        where: {
          role: 0,
        },
        include: "apples",
      });
      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan saat membukan halaman Beli Bahan Petani Apel"
        );
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan saat membukan halaman Beli Bahan Petani Apel"
      );
      next(error);
    }
  },

  async getBeliBahanKemasan(req, res, next) {
    try {
      const stocks = await models.Users.findAll({
        where: {
          role: 1,
        },
        include: "packages",
      });
      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Kemasan"
        );
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Kemasan"
      );
      next(error);
    }
  },

  async getBeliBahanTambah(req, res, next) {
    try {
      const stocks = await models.Users.findAll({
        where: {
          role: 2,
        },
        include: "materials",
      });
      if (stocks) {
        res.status(200).json({
          message: "Success",
          data: stocks,
        });
      } else {
        res.status(500);
        const error = new Error(
          "Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Bahan Tambah"
        );
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error(
        "Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Bahan Tambah"
      );
      next(error);
    }
  },

  async getDetailToko(req, res, next) {
    const id = req.params.shopID;
    try {
      const { role } = await models.Users.findByPk(id, {
        attributes: ["role"],
      });
      let stocks;
      switch (role) {
        case 0:
          stocks = await models.Users.findByPk(id, { include: "apples" });
          break;
        case 1:
          stocks = await models.Users.findByPk(id, { include: "packages" });
          break;
        case 2:
          stocks = await models.Users.findByPk(id, { include: "materials" });
          break;
        default:
          res.status(500);
          const err = new Error("Tidak ditemukan toko");
          next(err);
          break;
      }

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
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam membuka page Detail Toko");
      next(err);
    }
  },

  async PesanBahan(req, res, next) {
    const { from, total, items, banks, forSeller, forBuyer, type } = req.body;

    try {
      const order = await models.Transactions.create({
        from,
        to: req.user.id,
        total,
        forSeller,
        forBuyer,
        itemDetail: JSON.stringify(items),
        payment: banks,
        proof: "",
        status: 0,
        type: type,
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
            await models.FactoryStocks.decrement(
              "qty",
              {
                by: item.qty,
                where: {
                  id: item.id,
                  type: 1,
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

  async KonfirmasiPenerimaan(req, res, next) {
    const { id } = req.body;
    const userId = req.user.id;

    try {
      try {
        const items = await models.Transactions.findOne({
          where: { id: id },
        });

        const isChanged = await models.sequelize.transaction(async (t) => {
          JSON.parse(items.itemDetail).map(async (item) => {
            let name;
            if (item.grade) {
              name = item.item + item.grade;
            } else {
              name = item.item;
            }

            let find = await models.FactoryStocks.findOne(
              {
                where: {
                  item: name,
                  weight: item.unit,
                  buyPrice: item.price,
                  sellPrice: item.price,
                  owner: userId,
                  type: items.type,
                },
              },
              { transaction: t }
            );

            if (find === null) {
              await models.FactoryStocks.create(
                {
                  item: item.item,
                  qty: item.qty,
                  weight: item.unit,
                  buyPrice: item.price,
                  sellPrice: item.price,
                  owner: userId,
                  type: items.type,
                },
                { transaction: t }
              );
            } else {
              await models.FactoryStocks.increment(
                "qty",
                {
                  by: item.qty,
                  where: {
                    id: find.id,
                    type: items.type,
                  },
                },
                { transaction: t }
              );
            }
          });
          const order = await models.Transactions.update(
            { status: 3 },
            { where: { id: id } }
          );

          if (order) {
            return true;
          }
        });
        if (isChanged) {
          res.status(200).json({
            message: "Success",
            data: items,
          });
        }
      } catch (error) {
        res.status(500);
        const err = new Error("Terjadi kesalahan dalam konfirmasi penerimaan");
        next(err);
      }
    } catch (error) {
      res.status(500);
      const err = new Error("Terjadi kesalahan dalam konfirmasi penerimaan");
      next(err);
    }
  },

  async PostEditStok(req, res, next) {
    const { id, item, weight, qty, sellPrice, buyPrice } = req.body;

    try {
      const stock = await models.FactoryStocks.update(
        {
          item: item,
          weight: weight,
          qty: qty,
          sellPrice: sellPrice,
          buyPrice: buyPrice,
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
      console.log(err.message);
      res.status(500);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },
};
