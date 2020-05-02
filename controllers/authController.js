require("dotenv").config();

const models = require("../models");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

module.exports = {
  async RegisterHandler(req, res, next) {
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
      role,
    } = req.body;

    const reqValid =
      validator.isEmail(email) &&
      !validator.isEmpty(name) &&
      !validator.isEmpty(fullName) &&
      !validator.isEmpty(address) &&
      !validator.isEmpty(birthDate) &&
      !validator.isEmpty(username) &&
      !validator.isEmpty(password) &&
      !validator.isEmpty(bankAccount) &&
      !validator.isEmpty(bankNumber) &&
      !validator.isEmpty(phoneNumber) &&
      !validator.isEmpty(role);
    if (reqValid) {
      try {
        const find = await models.Users.findOne({
          where: { username: username },
        });

        if (find) {
          res.status(406);
          const error = new Error("Username sudah ada");
          next(error);
          return;
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);
          if (hashedPassword) {
            try {
              const user = await models.Users.create({
                name,
                fullName,
                IDcard: req.files["IDcard"][0].path,
                profilImage: req.files["profile"][0].path,
                address,
                birthDate,
                phoneNumber,
                email,
                username,
                password: hashedPassword,
                bankAccount,
                bankNumber,
                role,
              });

              if (user) {
                res.status(200).json({
                  message: "User Registered",
                  data: user,
                });
              } else {
                res.status(500);
                const error = new Error("Can't create new user");
                next(error);
              }
            } catch (err) {
              res.status(500);
              console.log(err);
              const error = new Error("Can't create new user");
              next(error);
            }
          } else {
            res.status(500);
            const error = new Error("Hash Failed");
            next(error);
          }
        }
      } catch (err) {
        res.status(500);
        const error = new Error("Hash Failed");
        next(error);
      }
    } else {
      res.status(406);
      const error = new Error("Field still empty");
      next(error);
    }
  },

  async LoginHandler(req, res, next) {
    const { username, password } = req.body;

    try {
      let user = await models.Users.findOne({
        where: { username: username },
      });

      if (user) {
        const isVerified = await bcrypt.compare(password, user.password);

        if (isVerified) {
          const payload = {
            id: user.id,
            role: user.role,
          };

          const token = jwt.sign(payload, KEY);

          if (token) {
            req.session.token = token;
            res.status(200).json({
              message: "Login Successful",
              user: user,
              data: token,
            });
          } else {
            res.status(500);
            const error = new Error("Gagal membuat token");
            next(error);
          }
        } else {
          res.status(500);
          const error = new Error("Password salah");
          next(error);
        }
      } else {
        res.status(500);
        const error = new Error("Username tidak ditemukan");
        next(error);
      }
    } catch (err) {
      res.status(500);
      console.log(err.message);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },

  async GetGantiProfile(req, res, next) {
    const userId = req.user.id;

    try {
      const user = await models.Users.findByPk(userId);
      if (user) {
        res.status(200).json({
          message: "success",
          data: user,
        });
      } else {
        res.status(500);
        const error = new Error("Terjadi kesalahan");
        next(error);
      }
    } catch (err) {
      res.status(500);
      const error = new Error("Terjadi kesalahan");
      next(error);
    }
  },

  async PostGantiProfile(req, res, next) {
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
    } = req.body;
    const userId = req.user.id;

    try {
      let user;
      if (typeof password != undefined) {
        try {
          user = await models.Users.update(
            {
              name: name,
              fullName: fullName,
              address: address,
              birthDate: birthDate,
              username: username,
              email: email,
              bankAccount: bankAccount,
              bankNumber: bankNumber,
              phoneNumber: phoneNumber,
              profilImage: req.file.path,
            },
            {
              where: {
                id: userId,
              },
            }
          );
        } catch (er) {
          console.log(er);
        }
      } else {
        try {
          const hashed = await bcrypt.hash(password, 12);

          user = await models.Users.update(
            {
              name: name,
              fullName: fullName,
              address: address,
              birthDate: birthDate,
              username: username,
              password: hashed,
              email: email,
              bankAccount: bankAccount,
              bankNumber: bankNumber,
              phoneNumber: phoneNumber,
            },
            {
              where: {
                id: userId,
              },
            }
          );
        } catch (er) {
          console.log(er);
        }
      }

      if (user) {
        res.status(200).json({
          message: "Success",
          data: user,
        });
      } else {
        res.status(500);
        const err = new Error("Terjadi kesalahan");
        next(err);
      }
    } catch (error) {
      res.status(500);
      const err = new Error("Terjadi kesalahan");
      next(err);
    }
  },
};
