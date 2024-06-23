const userMapping = require("../DataAccessMapping/userMapper")
const utilityService=require("./utilityService")

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

const handlePurchase= async(data)=>{

}

module.exports={addUser, logUser, handlePurchase}