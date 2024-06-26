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

const handleTransaction = async function (req, res)
{
    var checker = await userService.verifyPrices(req.body)
    if (checker === true)
    {
        result=await userService.handlePurchase(req.body)
        res.json(result)
    }
    else
    {
        res.json({success: false, problems: "Dane zakupu nie mogą zostać uznane za prawidłowe"})
    }
}

module.exports={registerUsew, loginUser, handleTransaction}