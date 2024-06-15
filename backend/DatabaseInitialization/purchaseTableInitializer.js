module.exports=(sequelize, Sequelize)=>{
    const purchase = sequelize.define("PURCHASES",{
        "GAMEKEY": {type: Sequelize.STRING, allowNull: false},
        "SELLINGPRICE": {type: Sequelize.DECIMAL(10,2), allowNull: false}
    })
    return purchase
}