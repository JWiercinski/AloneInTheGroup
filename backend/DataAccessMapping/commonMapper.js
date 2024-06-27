const db = require("../DatabaseInitialization/sqliteInitializer")
const {where} = require("sequelize");
const game = db.game
const developer = db.developer

const selectAllGames = async()=>{
    return await game.findAll({include: {model: developer, attributes: ["STUDIONAME"],}, where: {REMOVED: false}});
}

const selectGameById = async(id) =>{
    return await game.findOne({where: {"id": id, "REMOVED": false}})
}

module.exports={selectAllGames, selectGameById}