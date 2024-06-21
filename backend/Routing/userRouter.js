const userController = require("../Controlling/userController")
var express = require("express")
var router=express.Router()
router.post("/register", userController.registerUsew)
router.post("/login", userController.loginUser)
//router.post("/purchase", userController.handleTransaction)
module.exports = router

