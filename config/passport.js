const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const model = require("../models/index");

module.exports = passport => {
  passport.use(
    new LocalStrategy(async function(username, password, done) {
      try {
        const user = await model.Users.findOne({
          where: {
            username: username
          }
        });
        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.log("err1")
              return done(err);
            } else {
              if (result) {
                return done(null, user);
              } else {
                console.log("err2")
                return done(null, false);
              }
            }
          });
        } else {
          console.log("err3")
          return done(null, false);
        }
      } catch (err) {
        console.log("err4")
        return done(err);
      }
    })
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(async function(id, cb) {
    try {
      const user = await model.Users.findOne({ where: { id: id } });
      if (user) {
        cb(null, user);
      } else {
        cb(null, false);
      }
    } catch (err) {
      cb(err);
    }
  });
};