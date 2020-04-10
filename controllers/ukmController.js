const models = require("../models");
const { Op } = require('sequelize')

module.exports = {
    //Get Homepage
    async getHomepage(req, res, next) {
        try {
            await models.sequelize.transaction(async (t) => {
                const allStock = await models.MaterialStocks.findAll({
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
            const transaction = await models.Transactions.findAll({
                where: {
                    to: req.user.id,
                    createdAt: {
                        [Op.lte]: nexMonth,
                        [Op.gte]: prevMonth
                    }
                }
            })

            if (transaction) {
                res.status(200).json({
                    message: "Success",
                    data: transaction
                })
            } else {
                console.log(transaction)
                const err = new Error("Can't get laporan stok kemasan")
                next(err)
            }

        } catch (error) {
            console.log(error)
            const err = new Error("Can't get laporan stok kemasan")
            next(err)
        }
    },

    async getLaporanProduksi(req, res, next) {
        // const reqMonth = req.params.month
        // const reqYear = req.params.year

        const now = new Date()
        const prevMonth = new Date(now.getFullYear(), now.getMonth())
        const nexMonth = new Date(now.getFullYear(), now.getMonth() + 2)

        try {
            const stock = await models.FactoryStocks.findAll({
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

    //Post Data Laporan
    async postDataProduksi(req, res, next) {
        const { item, qty, price, weight, type } = req.body;
        const userId = req.user.id;

        if (!(item && qty && price && weight && type)) {
            res.status(406)
            const err = new Error("Field still empty")
            next(err)
        }
        try {
            let find = await models.FactoryStocks.findOne({
                where: {
                    item: item,
                    weight: weight,
                    price: price,
                    owner: userId,
                    type: type
                }
            })

            let stock
            if (find === null) {
                stock = await models.FactoryStocks.create({
                    item, qty, weight, price, owner: userId, type
                })
            } else {
                stock = await models.FactoryStocks.increment('qty', {
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
    //Get Lihat Stok
    async getLihatStokBahan(req, res, next) {
        try {
            const stocks = await models.FactoryStocks.findAll({
                where: {
                    owner: req.user.id,
                    type: 1
                }
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

    async getLihatStokProduk(req, res, next) {
        try {
            const stocks = await models.FactoryStocks.findAll({
                where: {
                    owner: req.user.id,
                    type: 2
                }
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

    async getBeliBahanPetani(req, res, next) {
        try {
            const stocks = await models.Users.findAll({
                where: {
                    role: 0
                }, include: 'apples'
            })
            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Petani Apel")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Petani Apel")
            next(error)
        }
    },

    async getBeliBahanKemasan(req, res, next) {
        try {
            const stocks = await models.Users.findAll({
                where: {
                    role: 1
                }, include: 'packages'
            })
            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Kemasan")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Kemasan")
            next(error)
        }
    },

    async getBeliBahanTambah(req, res, next) {
        try {
            const stocks = await models.Users.findAll({
                where: {
                    role: 2
                }, include: 'materials'
            })
            if (stocks) {
                res.status(200).json({
                    message: "Success",
                    data: stocks
                })
            } else {
                const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Bahan Tambah")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan saat membukan halaman Beli Bahan Pemasok Bahan Tambah")
            next(error)
        }
    },

    async getDetailToko(req, res, next) {
        const id = req.params.shopID
        try {
            const { role } = await models.Users.findByPk(id, { attributes: ['role'] })
            let stocks
            switch (role) {
                case 0:
                    stocks = await models.Users.findByPk(id, { include: 'apples' })
                    break;
                case 1:
                    stocks = await models.Users.findByPk(id, { include: 'packages' })
                    break;
                case 2:
                    stocks = await models.Users.findByPk(id, { include: 'materials' })
                    break;
                default:
                    const err = new Error("Tidak ditemukan toko")
                    next(err)
                    break;
            }

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

    async PesanBahan(req, res, next) {
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
                        await models.FactoryStocks.decrement('qty', {
                            by: item.qty,
                            where: {
                                id: item.id,
                                type: 2
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
    },

    async KonfirmasiPenerimaan(req, res, next) {
        const { id } = req.body;
        const userId = req.user.id;

        try {
            const order = await models.Transactions.update(
                { status: 3 },
                { where: { id: id } }
            )

            if (order) {
                const items = await models.Transactions.findOne({ where: { id: id } })

                const isChanged = await models.sequelize.transaction(async (t) => {
                    JSON.parse(items.itemDetail).map(async (item) => {
                        let find = await models.FactoryStocks.findOne({
                            where: {
                                item: item.item,
                                weight: item.weight,
                                price: item.price,
                                owner: userId,
                                type: 2
                            }
                        }, { transaction: t })

                        if (find === null) {
                            await models.FactoryStocks.create({
                                item: item.item,
                                qty: item.qty,
                                weight: item.weight,
                                price: item.price,
                                owner: userId,
                                type: 2
                            }, { transaction: t })
                        } else {
                            await models.FactoryStocks.increment('qty', {
                                by: item.qty,
                                where: {
                                    id: find.id,
                                    type: 2
                                }
                            }, { transaction: t })
                        }
                    })

                    return true
                })

                if (isChanged) {
                    res.status(200).json({
                        message: "Success",
                        data: items,
                    });
                }
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