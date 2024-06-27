const db = require("../DatabaseInitialization/sqliteInitializer")
const {where} = require("sequelize");
const dev = db.developer
const game = db.game
const purchase = db.purchase

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
        const games = await game.findAll({where:{"DEVELOPERId": data, "REMOVED": false}})
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
        const game1 = await game.findOne({where:{"id": gID, "REMOVED": false}})
        console.log(game1.id)
        if (game1.DEVELOPERId == dID)
            return game1
        else
            return {success: false, message: "Ta gra nie jest przypisana do Twojego konta"}
    }
    catch {return {success: false}}
}

const modifyGame = async (data, did, gid)=>{
    const game1= await fetchMyGame(did, gid)
    if (game1.success === undefined)
    {
        if (data.NAME)
        {
            game1.NAME=data.NAME
            game1.save()
        }
        if (data.DESCRIPTION)
        {
            game1.NAME=data.NAME
            game1.save()
        }
        if (data.PRICE)
        {
            game1.PRICE=data.PRICE
            game1.save()
        }
        if (data.RELEASEDATE)
        {
            game1.RELEASEDATE=data.RELEASEDATE
            game1.save()
        }
    }
    return game1
}

const deleteGame = async (did, gid) =>
{
    const game0=await fetchMyGame(did, gid)
    if (game0.success===undefined)
    {
        game0.REMOVED=true
        game0.save()
        return {success: true}}
    else
    {
        return {success: false}
    }
}

async function getAllSales(did) {
    try {
        const purchases = await game.findAll({
            include: [
                {
                    model: purchase,
                    attributes: ['SELLINGPRICE'],
                },
            ],
            where: {
                DEVELOPERId: did,
            },
        });
        return purchases;
    } catch (error) {
        throw error;
    }
}

module.exports={createDev, getDev, setGame, fetchMyGames, fetchMyGame, modifyGame, deleteGame, getAllSales}

