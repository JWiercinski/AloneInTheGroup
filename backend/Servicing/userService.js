const userMapping = require("../DataAccessMapping/userMapper")

const addUser= async (data) => {
    var result = {}
    const check = verifyUsers(data)
    if (check === true) {
        result = await userMapping.createUser(data)
    }
    else
    {
        result = {success: false, problems: "Niektóre elementy pozostały puste, bądź email nie spełnia wymogów adresowych..."}
    }
    return result
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

module.exports={addUser}