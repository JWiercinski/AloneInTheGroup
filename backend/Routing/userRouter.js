const userController = require("../Controlling/userController")
var express = require("express")
var router=express.Router()
router.post("/register", userController.register)
router.post("/login", userController.login)
module.exports = router

