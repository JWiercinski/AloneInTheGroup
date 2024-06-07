module.exports=(sequelize, Sequelize)=>{
    const purchase = sequelize.define("PURCHASES",{
        "GAMEKEY": {type: Sequelize.STRING, allowNull: false}
    })
    return purchase
}