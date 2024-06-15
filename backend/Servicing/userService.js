const userMapping = require("../DataAccessMapping/userMapper")
const bcrypt = require("bcrypt")
const {getUser} = require("../DataAccessMapping/userMapper");
const utilityService=require("./utilityService")
const salting = 10

const addUser= async (data) => {
    var result = {}
    const check = verifyUsers(data)
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

function verifyUsers(data)
{
    var ok = false
    if ("USERNAME" in data && "PASSWORD" in data && "EMAIL" in data && "FULLNAME" in data)
    {
        if (data.USERNAME && data.PASSWORD && data.EMAIL && data.FULLNAME)
        {
            const emailRegex = /.+@.+\..+/;
            if (emailRegex.test(data.EMAIL)) {
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

module.exports={addUser, logUser}