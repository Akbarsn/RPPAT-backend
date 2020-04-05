const models = require("../models");
const { Op } = require('sequelize')

module.exports = {
    //Get Homepage
    async getHomepage(req, res, next) {
        try {
            await models.sequelize.transaction(async (t) => {
                const allStock = await models.OutletStocks.findAll({
                    where: {
                        owner: req.user.id
                    }
                }, { transaction: t })
                const history = await models.Transaction.findAll({
                    where: {
                        $or: {
                            from: req.user.id,
                            to: req.user.id
                        }
                    }
                }, { transaction: t })

                return { allStock, history }
            })

            if (allStock && history) {
                res.status(200).json({
                    message: "Success",
                    data: { allStock, history }
                })
            } else {
                const error = new Error("Can't get homepage")
                next(error)
            }

        } catch (err) {
            console.log(err.message)
            const error = new Error("Can't get homepage")
            next(error)
        }
    },

    //Get Laporan
    async getLaporanPenjualan(req, res, next) {
        // const reqMonth = req.params.month
        // const reqYear = req.params.year

        const now = new Date()
        const prevMonth = new Date(now.getFullYear(), now.getMonth())
        const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2)

        try {
            const sell = await models.Transactions.findAll({
                where: {
                    from: req.user.id,
                    createdAt: {
                        [Op.lte]: nexMonth,
                        [Op.gte]: prevMonth
                    }
                }
            })

            if (sell) {
                res.status(200).json({
                    message: "Success",
                    data: sell
                })
            } else {
                console.log(sell)
                const err = new Error("Can't get laporan penjualan")
                next(err)
            }
        } catch (error) {
            console.log(error)
            const err = new Error("Can't get laporan penjualan")
            next(err)
        }
    },

    async getLaporanPembelian(req, res, next) {
        // const reqMonth = req.params.month
        // const reqYear = req.params.year

        const now = new Date()
        const prevMonth = new Date(now.getFullYear(), now.getMonth())
        const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2)

        try {
            const stock = await models.Transactions.findAll({
                where: {
                    to: req.user.id,
                    createdAt: {
                        [Op.lte]: nexMonth,
                        [Op.gte]: prevMonth
                    }
                }
            })

            if (stock) {
                res.status(200).json({
                    message: "Success",
                    data: stock
                })
            } else {
                console.log(stock)
                const err = new Error("Can't get laporan stok kemasan")
                next(err)
            }

        } catch (error) {
            console.log(error)
            const err = new Error("Can't get laporan stok kemasan")
            next(err)
        }
    },
    //Get Lihat Stok
    async getLihatStok(req, res, next) {
        try {
            const stocks = await models.OutletStocks.findAll({
                where: { owner: req.user.id }
            })

            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const error = new Error("Terjadi kegagalan membuka lihat stok")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kegagalan membuka lihat stok")
            next(error)
        }
    },

    //Get Riwayat Transaksi
    async getRiwayat(req, res, next) {
        try {
            const history = await models.Transactions.findAll({
                where: {
                    from: req.user.id
                }
            })

            if (history) {
                res.status(200).json({
                    message: "success",
                    data: history
                })
            } else {
                const error = new Error("Terjadi kesalahan saat membuka riwayat transaksi")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan saat membuka riwayat transaksi")
            next(error)
        }
    },

    async getBeliProduk(req, res, next) {
        try {
            const stocks = await models.Users.findAll({
                where: {
                    role: 3
                }, include: 'products'
            })
            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const error = new Error("Terjadi kesalahan saat membukan halaman Beli Produk UMKM")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan saat membukan halaman Beli Produk UMKM")
            next(error)
        }
    },

    async getDetailToko(req, res, next) {
        const id = req.params.shopID
        try {
            const stocks = await models.Users.findByPk(id, { include: 'products' })

            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const err = new Error("Terjadi kesalahan dalam membuka page Detail Toko")
                next(err)
            }
        } catch (error) {
            const err = new Error("Terjadi kesalahan dalam membuka page Detail Toko")
            next(err)
        }
    },

    async PesanProduk(req, res, next) {
        const {
            from,
            total,
            items
        } = req.body;

        try {
            const order = await models.Transactions.create({
                from,
                to: req.user.id,
                total,
                itemDetail: JSON.stringify(items),
                proof: null,
                status: 0
            })

            if (order) {
                res.status(200).json({
                    message: "Success",
                    data: order
                })
            } else {
                const err = new Error("Terjadi kesalahan dalam melakukan beli bahan")
                next(err)
            }
        } catch (error) {
            const err = new Error("Terjadi kesalahan dalam melakukan beli bahan")
            next(err)
        }
    },

    async BayarTransaksi(req, res, next) {
        const { id } = req.body;
        try {
            const order = await models.Transactions.update(
                { status: 1, proof: req.file.path },
                { where: { id: id } })

            if (order) {
                res.status(200).json({
                    message: "Success",
                    data: order
                })
            } else {
                const err = new Error("Terjadi kesalahan dalam melakukan pembayaran")
                next(err);
            }
        } catch (error) {
            const err = new Error("Terjadi kesalahan dalam melakukan pembayaran")
            next(err);
        }
    },

    async KonfirmasiPenerimaan(req, res, next) {
        const { id } = req.body;

        try {
            const order = await models.Transactions.update(
                { status: 3 },
                { where: { id: id } }
            )

            if (order) {
                res.status(200).json({
                    message: "Success",
                    data: order
                })
            } else {
                const err = new Error("Terjadi kesalahan dalam konfirmasi penerimaan");
                next(err)
            }
        } catch (error) {
            const err = new Error("Terjadi kesalahan dalam konfirmasi penerimaan");
            next(err)
        }
    }
}