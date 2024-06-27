const devMapping = require("../DataAccessMapping/devMapper")
const utilityService = require("./utilityService")

const verifyDev= async(data) =>
{
    var ok = false
    if ("DEVUSERNAME" in data && "PASSWORD" in data && "EMAIL" in data && "STUDIONAME" in data && "BANKACCOUNT" in data && "CITY" in data && "COUNTRY" in data && "PHONE" in data)
    {
        if (data.DEVUSERNAME && data.PASSWORD.length>9 && data.PASSWORD.length<51 && data.DEVUSERNAME.length>4 && data.DEVUSERNAME.length<30 && data.PASSWORD && data.EMAIL && data.STUDIONAME && data.BANKACCOUNT && data.CITY && data.COUNTRY && data.PHONE)
        {
            ok = await utilityService.isEmail(data.EMAIL)
            const phoneRegex = /^[+]?[0-9]+$/
            if (ok ===true && data.BANKACCOUNT.length>7 && data.BANKACCOUNT.length<35 && phoneRegex.test(data.PHONE) && data.PHONE.length<16 && data.PHONE.length>2) {
                ok = true
            }
            else
            {
                ok=false
            }
        }
    }
    return ok
}

const logDev = async (data) =>{
    dev=await devMapping.getDev(data)
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
    const check = await verifyDev(data)
    console.log(check)
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
            isP = await utilityService.isPrice(data.PRICE)
            isok=await utilityService.isDate(data.RELEASEDATE)
            if (isP===true && isok===true)
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

const modifyGame = async (data, did, gid)=>{
    if (data.PRICE) {
        cool = await utilityService.isPrice(data.PRICE)
        if (cool !== true) {
            data.PRICE = ""
        }
    }
    if (data.RELEASEDATE)
    {
        cool2 = await utilityService.isDate(data.RELEASEDATE)
        if (cool2 !== true)
        {
            data.RELEASEDATE=""
        }
    }
    return await devMapping.modifyGame(data, did, gid)}

const dropGame = async (did, gid)=>{
    return await devMapping.deleteGame(did, gid)
}

const getMySales = async(did)=>{
    var sum=0
    var num =0
    values = await devMapping.getAllSales(did)
    console.log(values)
    for (const value of values)
    {
        for (const p of value.PURCHASEs)
        {
            sum = sum + p.SELLINGPRICE
            num = num + 1
        }
    }
    console.log(sum)
    return {"TOTAL": sum, "NUMBER": num}
}

module.exports={logDev, setDev, addGame, getMyGames, getMyGame, modifyGame, dropGame, getMySales}