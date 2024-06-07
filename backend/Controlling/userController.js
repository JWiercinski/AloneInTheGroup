const userService = require("../Servicing/userService")

const register = async function (req, res)
{
    const result = await userService.addUser(req.body)
    res.json(result)
}

const login = async function (req, res)
{
    const result= await userService.logUser(req.body)
    res.json(result)
}

module.exports={register, login}