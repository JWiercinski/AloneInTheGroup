var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var corsOptions =
    {
        origin: "http://localhost:16666"
    }

var userRouter = require('./Routing/userRouter');
var devRouter = require("./Routing/devRouter")
var commonRouter = require("./Routing/commonRouter")

var app = express();

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use("/dev", devRouter)
app.use("/", commonRouter)
module.exports = app;
