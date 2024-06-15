const db = require("../DatabaseInitialization/sqliteInitializer")
const dev = db.developer
const game = db.game

const createDev = async(data) =>
{
    try
    {
        await dev.create(data)
        return {success: true}
    }
    catch
    {
        return {success: false, problems: "Wystąpił błąd przy tworzeniu konta - prawdopodobnie istnieje już konto o tej nazwie"}
    }
}

const getDev = async(data) =>{
    try{
        const dev0 = await dev.findOne({where: {"DEVUSERNAME": data.DEVUSERNAME}})
        if (dev0)
        {
            return dev0
        }
        else
        {
            return {failure: true}
        }
    }catch{
        return {failure: true}
    }
}

const setGame = async(data) =>{
    try
    {
        await game.create(data)
        return {success: true}
    }
    catch
    {
        return {success: false, problems: "Nie udało się stworzyć gry"}
    }
}
module.exports={createDev, getDev, setGame}

