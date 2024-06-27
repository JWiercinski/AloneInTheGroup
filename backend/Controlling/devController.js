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

const getDevGames = async function (req, res) {
    const result = await devService.getMyGames(req.params.did)
    res.json(result)
}

const getDevSingleGame = async function (req, res) {
    const result = await devService.getMyGame(req.params.did, req.params.gid)
    res.json(result)
}

const modDevGame = async function (req, res) {
    const result = await devService.modifyGame(req.body, req.params.did, req.params.gid)
    res.json(result)
}

const pullGameBack = async function (req, res)
{
    const result = await devService.dropGame(req.params.did, req.params.gid)
    res.json(result)
}

const getAllSales = async function (req, res)
{
    const result = await devService.getMySales(req.params.did)
    res.json(result)
}

module.exports={loginDev,registerDev,addGame, getDevGames, getDevSingleGame, modDevGame, pullGameBack, getAllSales}