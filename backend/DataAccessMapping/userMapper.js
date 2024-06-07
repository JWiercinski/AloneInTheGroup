const db = require("../DatabaseInitialization/sqliteInitializer")
const user = db.user
const transaction = db.transaction
const purchase = db.purchase
const Op =  db.Sequelize.Op

const createUser = async(data) =>
{
    try
    {
        await user.create(data)
        return {success: true}
    }
    catch
    {
        return {success: false, problems: "Wystąpił błąd przy tworzeniu konta - prawdopodobnie istnieje już konto o tej nazwie"}
    }
}

module.exports = {createUser}