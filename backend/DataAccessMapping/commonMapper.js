const db = require("../DatabaseInitialization/sqliteInitializer")
const game = db.game

const selectAllGames = async()=>{
    return await game.findAll()
}

module.exports={selectAllGames}