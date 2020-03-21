const router = require('express').Router();
const authorization = require('./auth')

router.use('/auth', authorization)

router.get('/fail-login', (req,res)=>{
    res.status(406).json({
        message:"Wrong username or password"
    })
})

module.exports = router