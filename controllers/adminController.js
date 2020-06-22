const models = require('../models')
const { sequelize } = require('../models')

module.exports = {
    async GetHomepage(req, res, next) {
        const users = await models.Users.findAll({
            attributes: ['role', [sequelize.fn('COUNT', 'name'), 'userCount']],
            group: ['role']
        })

        const appleType = await sequelize.query("SELECT DISTINCT `item`, `grade` from FarmerStocks", { type: sequelize.QueryTypes.SELECT })

        const materialType = await sequelize.query("SELECT DISTINCT `item`, `unit` from MaterialStocks", { type: sequelize.QueryTypes.SELECT })

        const packageType = await sequelize.query("SELECT DISTINCT `item`, `unit` from PackageStocks", { type: sequelize.QueryTypes.SELECT })

        const productType = await sequelize.query("SELECT DISTINCT `item`, `weight` from FactoryStocks", { type: sequelize.QueryTypes.SELECT })

        const transactions = await models.Transactions.findAll({
            attributes: [[sequelize.fn('SUM', sequelize.col('total')), 'total']],
            raw: true,
        })

        const apples = await models.FarmerStocks.findAll()

        const materials = await models.MaterialStocks.findAll()

        const packages = await models.PackageStocks.findAll()

        const products = await models.FactoryStocks.findAll({
            where: {
                type: 1
            }
        })

        var totalBuy = 0;

        apples.forEach(apple => {
            totalBuy += apple.buyPrice * apple.qty
        });

        materials.forEach(material => {
            totalBuy += material.buyPrice * material.qty
        })

        packages.forEach(package => {
            totalBuy += package.buyPrice * package.qty
        })

        products.forEach(product => {
            totalBuy += product.buyPrice * product.qty
        })

        const difference = parseInt(transactions[0].total) - totalBuy 

        if (users) {
            res.status(200).json({
                data: {
                    users,
                    appleCount: appleType.length,
                    materialCount: materialType.length,
                    packageCount: packageType.length,
                    productCount: productType.length,
                    totalSell: parseInt(transactions[0].total),
                    totalBuy: totalBuy,
                    difference: difference
                }
            })
        } else {
            res.status(500)
            next(new Error("Error"))
        }
    },
    async GetPetaniPage(req, res, next) {

    },
    async GetKemasanPage(req, res, next) {

    },
    async GetTambahanPage(req, res, next) {

    },
    async GetUMKMPage(req, res, next) {

    },
    async GetOutletPage(req, res, next) {

    }
}