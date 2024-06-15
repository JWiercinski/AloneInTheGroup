const bcrypt = require("bcrypt");
salting = 12
const datetool = require("date-fns")
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

const comparePass= async (data, entity) => {
    return bcrypt.compare(data.PASSWORD, entity.PASSWORD)
        .then(match =>{
                if (match)
                {
                    return {success: true, id: entity.id}
                }
                else
                {
                    return {success: false, problems: "Dane logowania nie są poprawne."}
                }
            }
        )
}

const isDate=async (dateMaybe) => {
    const parsed =datetool.parseISO(dateMaybe)
    return datetool.isValid(parsed)
}

module.exports={comparePass, hashPass, isDate}