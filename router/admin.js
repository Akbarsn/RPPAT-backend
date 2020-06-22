const router = require('express').Router()
const {GetHomepage, GetKemasanPage, GetOutletPage, GetPetaniPage, GetTambahanPage, GetUMKMPage} = require('../controllers/adminController')

router.get('/', GetHomepage)

router.get('/petani', GetPetaniPage)

router.get('/kemasan', GetKemasanPage)

router.get('/tambahan', GetTambahanPage)

router.get('/umkm', GetUMKMPage)

router.get('/outlet', GetOutletPage)

module.exports = router
