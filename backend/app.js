var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./Routing/userRouter');
//var productRouter = require("./Routing/productRouter")
//var purchaseRouter = require("./Routing/purchaseRouter")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
//app.use("/product", productRouter)
//app.use("/purchase", purchaseRouter)
module.exports = app;
