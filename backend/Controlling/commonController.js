const commonService = require("../Servicing/commonService")

const showAllGames = async function (req, res){
    response = await commonService.returnAllGames()
    res.json(response)
}

module.exports={showAllGames}