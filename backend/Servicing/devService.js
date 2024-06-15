const devMapping = require("../DataAccessMapping/devMapper")
const utilityService = require("./utilityService")
const bcrypt = require("bcrypt")

function verifyDev(data)
{
    var ok = false
    if ("DEVUSERNAME" in data && "PASSWORD" in data && "EMAIL" in data && "STUDIONAME" in data && "BANKACCOUNT" in data && "CITY" in data && "COUNTRY" in data && "PHONE" in data)
    {
        if (data.DEVUSERNAME && data.PASSWORD && data.EMAIL && data.STUDIONAME && data.BANKACCOUNT && data.CITY && data.COUNTRY && data.PHONE)
        {
            const emailRegex = /.+@.+\..+/;
            const phoneRegex = /^[+]?[0-9]+$/
            if (emailRegex.test(data.EMAIL) && data.BANKACCOUNT.length>7 && data.BANKACCOUNT.length<35 && phoneRegex.test(data.PHONE) && data.PHONE.length<16 && data.PHONE.length>2) {
                ok = true
                return ok
            }
            else
            {
                ok=false
                return ok
            }
        }
    }
    return ok
}

const logDev = async (data) =>{
    dev=await devMapping.getDev(data)
    console.log(dev)
    if ("failure" in dev === false)
    {
        return await utilityService.comparePass(data, dev)
    }
    else
    {
        return {success: false, problems: "Dane logowania nie są poprawne."}
    }
}

const setDev = async (data) =>
{
    var result = {}
    const check = verifyDev(data)
    if (check === true) {
        newdata=await utilityService.hashPass(data)
        if ("failure" in newdata)
        {
            result ={success: false, problems:"Nie udało się zhashować hasła..."}
        }
        else
        {
            result = await devMapping.createDev(newdata)
        }
    }
    else
    {
        result = {success: false, problems: "Niektóre elementy pozostały puste, bądź zaistniały problemy z adresem email, kontem bankowym lub numerem telefonu"}
    }
    return result
}

const addGame = async (data)=>
{
    var ok = false
    if ("NAME" in data && "DESCRIPTION" in data && "PRICE" in data && "RELEASEDATE" in data && "DEVELOPERId" in data) {
        if (data.NAME && data.DESCRIPTION && data.PRICE && data.RELEASEDATE && data.DEVELOPERId)
        {
            const priceRegex =  /^-?\d+(\.\d{1,2})?$/
            isok=await utilityService.isDate(data.RELEASEDATE)
            if (priceRegex.test(data.PRICE) && isok===true)
            {
                result = await devMapping.setGame(data)
                return result
            }
            else
            {
                return ok
            }
        }
    }
    return ok
}

const getMyGames = async(data) =>{
        const result=await devMapping.fetchMyGames(data)
        if (result.length>0) {
            return result
        }
        else
        {
            return {failure: true}
        }
}

const getMyGame = async (did, gid)=>
{
    const result = await devMapping.fetchMyGame(did, gid)
    return result
}

module.exports={logDev, setDev, addGame, getMyGames, getMyGame}