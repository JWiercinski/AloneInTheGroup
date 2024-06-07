module.exports=(sequelize, Sequelize)=>{
    const transaction = sequelize.define("TRANSACTION",{
        "PRICE":{type: Sequelize.DECIMAL(10,2), allowNull: false},
        "METHOD":{type: Sequelize.STRING, allowNull: false},
        "CLEARED":{type: Sequelize.BOOLEAN, allowNull: false}
    })
    return transaction
}