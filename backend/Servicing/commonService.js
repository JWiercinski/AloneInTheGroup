const commonMapper = require("../DataAccessMapping/commonMapper")

const returnAllGames = async ()=>{
    return await commonMapper.selectAllGames()
}

module.exports={returnAllGames}