const model = require('../models')
const bcrypt = require('bcryptjs')
const validator = require('validator')

module.exports = {
    async RegisterHandler (req,res,next){
        const {
            name,
            fullName,
            address,
            birthDate,
            username,
            password,
            email,
            bankAccount,
            bankNumber,
            phoneNumber,
            role
        } = req.body;
    
        const reqValid = validator.isEmail(email) &&
            !validator.isEmpty(name) &&
            !validator.isEmpty(fullName) &&
            !validator.isEmpty(address) &&
            !validator.isEmpty(birthDate) &&
            !validator.isEmpty(username) &&
            !validator.isEmpty(password) &&
            !validator.isEmpty(bankAccount) &&
            !validator.isEmpty(bankNumber) &&
            !validator.isEmpty(phoneNumber) &&
            !validator.isEmpty(role)
        if (reqValid) {
            //Hashing password
            try {
                const hashedPassword = await bcrypt.hash(password, 12)
    
                if (hashedPassword) {
                    try {
                        const user = await model.Users.create({
                            name,
                            fullName,
                            IDcard: req.file.path,
                            address,
                            birthDate,
                            phoneNumber,
                            email,
                            username,
                            password: hashedPassword,
                            bankAccount,
                            bankNumber,
                            role
                        })
    
                        if (user) {
                            res.status(200).json({
                                message: "User Registered",
                                data: user
                            })
                        } else {
                            const error = new Error("Can't create new user")
                            next(error)
                        }
    
                    } catch (err) {
                        console.log(err.message)
                        const error = new Error("Can't create new user")
                        next(error)
                    }
                } else {
                    const error = new Error("Hash Failed")
                    next(error)
                }
            } catch (err) {
                const error = new Error("Hash Failed")
                next(error)
            }
    
        } else {
            res.status(406)
            const error = new Error("Field still empty");
            next(error)
        }
    },

    async LoginHandler (req,res,next){
        res.status(200).json({
            message:"Successful Login",
            data:req.user
        })
    }

}