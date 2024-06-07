const userService = require("../Servicing/userService")

const register = async function (req, res)
{
    const result = await userService.addUser(req.body)
    res.json(result)
}

module.exports={register}