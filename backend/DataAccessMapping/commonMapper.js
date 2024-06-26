const db = require("../DatabaseInitialization/sqliteInitializer")
const {where} = require("sequelize");
const game = db.game
const developer = db.developer

const selectAllGames = async()=>{
    return await game.findAll({include:{model: developer, attributes: ["STUDIONAME"]}})
}

const selectGameById = async(id) =>{
    return await game.findByPk(id)
}

module.exports={selectAllGames, selectGameById}