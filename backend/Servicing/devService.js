const devMapping = require("../DataAccessMapping/devMapper")
const bcrypt = require("bcrypt")
const salting = 12
const hashPass = async(data) =>
{
    try
    {
        const hashedPass = await bcrypt.hash(data.PASSWORD, salting)
        data.PASSWORD=hashedPass
        return data
    }
    catch
    {
        return {failure: true}
    }
}

const comparePass= async (data, dev) => {
    return bcrypt.compare(data.PASSWORD, dev.PASSWORD)
        .then(match =>{
            if (match)
            {
                return {success: true, id: dev.id}
            }
            else
            {
                return {success: false, problems: "Dane logowania nie są poprawne."}
            }
        }
        )
}

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
        return await comparePass(data, dev)
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
        newdata=await hashPass(data)
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

module.exports={logDev, setDev}