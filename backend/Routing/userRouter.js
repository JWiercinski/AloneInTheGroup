const userController = require("../Controlling/userController")
var express = require("express")
var router=express.Router()
router.post("/register", userController.registerUsew)
router.post("/login", userController.loginUser)
module.exports = router

