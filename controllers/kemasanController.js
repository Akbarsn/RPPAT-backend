const models = require("../models");
const { Op } = require('sequelize')

module.exports = {
    async getHomepage(req, res, next) {
        try {
            let trans = await models.sequelize.transaction(async (t) => {
                const allStock = await models.PackageStocks.findAll({
                    where: {
                        owner: req.user.id
                    }
                }, { transaction: t })
                const history = await models.Transactions.findAll({
                    where: {
                        from: req.user.id,
                    }
                }, { transaction: t })

                return { allStock, history }
            })

            let buying = 0;
            trans.allStock.map((stock) => {
                buying += stock.buyPrice
            })

            let selling = 0;
            trans.history.map((transaction) => {
                selling += transaction.total
            })

            trans = {...trans, buying, selling}

            if (trans) {
                res.status(200).json({
                    message: "Success",
                    data: {trans},
                });
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

    async getLaporanStokKemasan(req, res, next) {
        // const reqMonth = req.params.month
        // const reqYear = req.params.year

        const now = new Date()
        const prevMonth = new Date(now.getFullYear(), now.getMonth())
        const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2)

        try {
            const stock = await models.PackageStocks.findAll({
                where: {
                    owner: req.user.id,
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

    async postStokKemasan(req, res, next) {
        const { item, qty, sellPrice, buyPrice, unit } = req.body;
        const userId = req.user.id;

        if (!(item && unit && qty && sellPrice && buyPrice)) {
            res.status(406)
            const err = new Error("Field still empty")
            next(err)
        }
        try {
            let find = await models.PackageStocks.findOne({
                where: {
                    item: item,
                    sellPrice: sellPrice,
                    buyPrice: buyPrice,
                    unit: unit
                }
            })


            let stock;
            if (find === null) {
                stock = await models.PackageStocks.create({
                    item, unit, qty, sellPrice, buyPrice, owner: userId
                })
            } else {
                stock = await models.PackageStocks.increment('qty', {
                    by: qty,
                    where: {
                        id: find.id
                    }
                })
            }


            if (stock) {
                res.status(200).json({
                    message: "Success",
                    data: (find === null ? stock : find)
                })
            } else {
                const err = new Error("Can't add stok panen")
                next(err)
            }
        } catch (error) {
            console.log(error.message)
            const err = new Error("Cant add stok panen")
            next(err)
        }
    },

    async getLihatStok(req, res, next) {
        try {
            const stocks = await models.PackageStocks.findAll({
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

    async KonfirmasiPembayaran(req, res, next) {
        const { id } = req.body;

        try {
            const order = await models.Transactions.update(
                { status: 2 },
                { where: { id: id } }
            )

            if (order) {
                const items = await models.Transactions.findOne({ where: { id: id } })

                const isChanged = await models.sequelize.transaction(async (t) => {
                    JSON.parse(items.itemDetail).map(async (item) => {
                        await models.PackageStocks.decrement('qty', {
                            by: item.qty,
                            where: {
                                id: item.id
                            }
                        }, { transaction: t })
                    })

                    return true
                })

                if (isChanged) {
                    res.status(200).json({
                        message: "Success",
                        data: items,
                    });
                } else {
                    const err = new Error("Terjadi kesalahan dalam konfirmasi pembayaran");
                    next(err)
                }
            } else {
                const err = new Error("Terjadi kesalahan dalam konfirmasi pembayaran");
                next(err)
            }
        } catch (error) {
            const err = new Error("Terjadi kesalahan dalam konfirmasi pembayaran");
            next(err)
        }
    }
}