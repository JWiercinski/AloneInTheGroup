const commonMapper = require("../DataAccessMapping/commonMapper")

const returnAllGames = async ()=>{
    games = await commonMapper.selectAllGames()
    console.log(games)
    return games
}

module.exports={returnAllGames}