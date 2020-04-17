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
                const selling = await models.POS.findAll({
                    where: {
                        owner: req.user.id,
                    },
                });

                return { allStock, history, selling };
            });

            let buying = 0;
            trans.history.map((transaction) => {
                buying += transaction.total;
            });

            let selling = 0;
            trans.selling.map((transaction) => {
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
            const sell = await models.POs.findAll({
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

    async getBeliProduk(req, res, next) {
        try {
            const stocks = await models.Users.findAll({
                where: {
                    role: 3,
                },
                include: "products",
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

    async PesanProduk(req, res, next) {
        const { from, total, items } = req.body;

        try {
            const order = await models.Transactions.create({
                from,
                to: req.user.id,
                total,
                itemDetail: JSON.stringify(items),
                proof: null,
                status: 0,
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

        try {
            const order = await models.Transactions.update(
                { status: 3 },
                { where: { id: id } }
            );

            if (order) {
                const items = await models.Transactions.findOne({ where: { id: id } });

                const isChanged = await models.sequelize.transaction(async (t) => {
                    JSON.parse(items.itemDetail).map(async (item) => {
                        let find = await models.OutletStocks.findOne(
                            {
                                where: {
                                    item: item.item,
                                    weight: item.weight,
                                    owner: userId,
                                },
                            },
                            { transaction: t }
                        );

                        if (find === null) {
                            await models.OutletStocks.create(
                                {
                                    item: item.item,
                                    qty: item.qty,
                                    weight: item.weight,
                                    itemPhoto: "",
                                    buyPrice: item.price,
                                    sellPrice: item.price,
                                    owner: userId,
                                },
                                { transaction: t }
                            );
                        } else {
                            await models.OutletStocks.increment(
                                "qty",
                                {
                                    by: item.qty,
                                    where: {
                                        id: find.id,
                                        type: 2,
                                    },
                                },
                                { transaction: t }
                            );
                        }
                    });

                    return true;
                });

                if (isChanged) {
                    res.status(200).json({
                        message: "Success",
                        data: items,
                    });
                }
            } else {
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
            const cashier = await models.Cashiers.create({
                username,
                password,
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
};
