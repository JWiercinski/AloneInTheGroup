const express=require("express")
const commonController=require("../Controlling/commonController")
var router = express.Router()

router.get("/products", commonController.showAllGames)

module.exports=router