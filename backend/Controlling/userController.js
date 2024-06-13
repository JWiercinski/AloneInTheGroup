const userService = require("../Servicing/userService")

const registerUsew = async function (req, res)
{
    const result = await userService.addUser(req.body)
    res.json(result)
}

const loginUser = async function (req, res)
{
    const result= await userService.logUser(req.body)
    res.json(result)
}

module.exports={registerUsew, loginUser}