require('dotenv').config()
const models = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const KEY = process.env.JWT_SECRET

module.exports = {
    async GetPage(req, res, next) {
        const outletId = req.params.outlet_id;

        try {
            const items = await models.OutletStocks.findAll({
                where: {
                    id: outletId
                }
            })

            if (items) {
                res.status(200).json({
                    message: "Success",
                    data: items
                })
            } else {
                const error = new Error("Terjadi kesalahan pada saat membuka page transaksi")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan pada saat membuka page transaksi")
            next(error)
        }
    },

    async PostTransaksi(req, res, next) {
        const { outletId, total, items } = req.body
        const userId = req.user.id
        let transaction, selling;


        try {
            transaction = await models.sequelize.transaction();

            selling = await models.POS.create({
                owner: outletId,
                total,
                itemDetail: JSON.stringify(items),
                byCashier: userId
            })

            items.map(async (item) => {
                await models.OutletStocks.decrement('qty', { by: item.qty, where: item.id })
            })

            await transaction.commit()

            res.status({
                message: "Berhasil",
                data: selling
            })
        } catch (err) {
            if (transaction) await transaction.rollback()
        }
    },

    async Login(req, res, next) {
        const { username, password } = req.body

        try {
            const user = await models.Cashiers.findOne({
                where: {
                    username: username
                }
            })

            if (user) {
                try {
                    const checkPass = await bcrypt.compare(password, user.password)
                    if (checkPass) {
                        const payload = {
                            id: user.id,
                            outletId: user.outletId
                        }

                        const token = await jwt.sign(payload, KEY)

                        if (token) {
                            req.session.token = token
                            res.status(200).json({
                                message: "Success",
                                token: token
                            })
                        } else {
                            console.log("token tidak ada")
                            const error = new Error("Terjadi kesalahan pada saat login")
                            next(error)
                        }
                    } else {
                        console.log("password salah")
                        const error = new Error("Terjadi kesalahan pada saat login")
                        next(error)
                    }
                } catch (err) {
                    const error = new Error("Terjadi kesalahan pada saat login")
                    next(error)
                }
            } else {
                console.log("username salah")
                const error = new Error("Terjadi kesalahan pada saat login")
                next(error)
            }
        } catch (err) {
            const error = new Error("Terjadi kesalahan pada saat login")
            next(error)
        }
    }
}