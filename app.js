const express = require('express')
const app = express()
const session = require('express-session')
const port = 5000;

//Importing Router
const appRoute = require('./router')

app.use(express.json())

//Express body parser
app.use(express.urlencoded({ extended: true }));

//Express session config
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use('/', appRoute)

function notFound(req, res, next) {
    res.status(404)
    res.json({
        message: "Page Not Found"
    })
}

app.use(notFound)

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({
        status:"Error",
        message:err.message
    })
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening to ${port}`);
});