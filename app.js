const express = require("express");
const app = express();
const morgan = require("morgan") //logger
const bodyParser = require("body-parser")

const queryBuilder = require("./api/routes/products");
const productRoutes = require("./public/public-app");
const { use } = require("./api/routes/products");



app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//app.use(productRoutes.getPath)
app.use("/api", queryBuilder.build);

// if we didnt find the route
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;