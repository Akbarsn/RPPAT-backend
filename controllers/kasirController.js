const models = require('../models')

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

            items.map((item) => {
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
        
    }
}