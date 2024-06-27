module.exports=(sequelize, Sequelize) =>{
    const Game = sequelize.define("GAMES",{
        "NAME":{type: Sequelize.STRING, allowNull: false},
        "DESCRIPTION":{type: Sequelize.TEXT, allowNull: false},
        "PRICE":{type: Sequelize.DECIMAL(10, 2), allowNull: false},
        "RELEASEDATE":{type: Sequelize.DATEONLY, allowNull: false},
        "REMOVED":{type: Sequelize.BOOLEAN, allowNull:false, defaultValue: false}
    })
    return Game
}