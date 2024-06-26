const userMapping = require("../DataAccessMapping/userMapper")
const utilityService=require("./utilityService")
const commonMapping = require("../DataAccessMapping/commonMapper")

const addUser= async (data) => {
    var result = {}
    const check = await verifyUsers(data)
    if (check === true) {
        newdata=await utilityService.hashPass(data)
        console.log(newdata)
        if ("failure" in newdata)
        {
            result ={success: false, problems:"Nie udało się zhashować hasła..."}
        }
        else
        {
            result = await userMapping.createUser(newdata)
        }
    }
    else
    {
        result = {success: false, problems: "Niektóre elementy pozostały puste, bądź email nie spełnia wymogów adresowych..."}
    }
    return result
}

const logUser = async (data) =>{
    user=await userMapping.getUser(data)
    if ("failure" in user === false)
    {
        return await utilityService.comparePass(data, user)
    }
    else
    {
        return {success: false, problems: "Dane logowania nie są poprawne."}
    }
}

const verifyUsers= async(data)=>
{
    var ok = false
    if ("USERNAME" in data && "PASSWORD" in data && "EMAIL" in data && "FULLNAME" in data)
    {
        if (data.USERNAME && data.PASSWORD && data.PASSWORD.length>9 && data.PASSWORD.length<51 && data.USERNAME.length>4 && data.USERNAME.length<30 && data.EMAIL && data.FULLNAME)
        {
            ok=await utilityService.isEmail(data.EMAIL)
        }
    }
    return ok
}

const verifyPrices= async(data) =>{
    var success = true
    var fullprice = 0
    for (const data2 of data.PURCHASE)
    {
        var x = await commonMapping.selectGameById(data2.GAMEID)
        var partprice=data2.SINGLEPRICE*data2.QUANTITY
        fullprice=fullprice+partprice
        if (data2.SINGLEPRICE !== x.PRICE)
        {
            success = false
        }
    }
    if (fullprice !== data.AMOUNT || fullprice===0)
    {
        success = false
    }
    return success
}
const handlePurchase= async(data)=> {
    if (data.AMOUNT !== undefined && data.METHOD !== undefined && data.USERId !== undefined) {
        const paydata = {
            PRICE: data.AMOUNT,
            METHOD: data.METHOD,
            USERId: data.USERId
        }
        const nevpurchase = await userMapping.createTransaction(paydata)
        for (const data2 of data.PURCHASE)
        {
            for (let q=0; q<data2.QUANTITY; q++)
            {
                const gamekey= await utilityService.generateKey()
            const perchdata= {
                SELLINGPRICE: data2.SINGLEPRICE,
                GAMEKEY: gamekey,
                USERId: data.USERId,
                GAMEId: data2.GAMEID,
                TRANSACTIONId: nevpurchase.id
            }
            await userMapping.createPurchase(perchdata)
            }
        }
    return {success: true}
    }
    else
        {
            return {success: false, problems: "Brakuje odpowiednich pól w przesłanych danych"}
        }
}

module.exports={addUser, logUser, verifyPrices, handlePurchase}