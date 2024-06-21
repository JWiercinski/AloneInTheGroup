const db = require("../DatabaseInitialization/sqliteInitializer")
const user = db.user
const transaction = db.transaction
const purchase = db.purchase
const game = db.game
const Op =  db.Sequelize.Op

const createUser = async(data) =>
{
    try
    {
        await user.create(data)
        return {success: true}
    }
    catch
    {
        return {success: false, problems: "Wystąpił błąd przy tworzeniu konta - prawdopodobnie istnieje już konto o tej nazwie"}
    }
}

const getUser = async(data) =>{
    try{
        const user1 = await user.findOne({where: {"USERNAME": data.USERNAME}})
        if (user1)
        {
            return user1
        }
        else
        {
            return {failure: true}
        }
    }catch{
        return {failure: true}
    }
}

const getBoughtGames = async(data) =>
{
    try
    {
        const result = await purchase.findAll({
            attributes: "GAMEKEY", include :[{
                model: game, attributes: "NAME"
            }], where: {"USERId": data.id}
        })
        return result
    }
    catch
    {
        return {success: false}
    }
}

const createTransaction = async (Tdata) =>{

}

const createPurchase = async (Pdata) =>{

}

module.exports = {createUser, getUser, createTransaction, createPurchase}