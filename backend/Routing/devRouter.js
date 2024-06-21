const devController = require("../Controlling/devController")
var exp = require("express")
var router = exp.Router()
router.post("/register", devController.registerDev)
router.post("/login", devController.loginDev)
router.post("/game/new", devController.addGame)
router.get("/game/:did", devController.getDevGames)
router.get("/game/:did/:gid", devController.getDevSingleGame)
router.put("/game/:did/:gid", devController.modDevGame)
router.delete("/game/:did/:gid", devController.pullGameBack)
module.exports=router