const userController = require("../Controlling/userController")
var express = require("express")
var router=express.Router()
router.post("/register", userController.register)
module.exports = router

