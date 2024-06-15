const db = require("../DatabaseInitialization/sqliteInitializer")
const {where} = require("sequelize");
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

const fetchMyGames = async(data) =>{
    try
    {
        const games = await game.findAll({where:{"DEVELOPERId": data}})
        return games
    }
    catch
    {
        return {success: false}
    }
}
const fetchMyGame = async (dID, gID) =>{
    try
    {
        const game1 = await game.findAll({where:{"id": gID}})
        console.log(game1.id)
        if (game1[0].DEVELOPERId == dID)
            return game1
        else
            return {success: false, message: "Ta gra nie jest przypisana do Twojego konta"}
    }
    catch {return {success: false}}
}
module.exports={createDev, getDev, setGame, fetchMyGames, fetchMyGame}

