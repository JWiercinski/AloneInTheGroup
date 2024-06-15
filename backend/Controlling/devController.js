const devService = require ("../Servicing/devService")

const registerDev = async function (req, res) {
    const result = await devService.setDev(req.body)
    res.json(result)
}

const loginDev = async function (req, res) {
    const result = await devService.logDev(req.body)
    res.json(result)
}

const addGame = async function (req, res){
    const result = await devService.addGame(req.body)
    res.json(result)
}

module.exports={loginDev,registerDev,addGame}