const devController = require("../Controlling/devController")
var exp = require("express")
var router = exp.Router()
router.post("/register", devController.registerDev)
router.post("/login", devController.loginDev)
module.exports=router