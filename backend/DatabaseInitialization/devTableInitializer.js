module.exports=(sequelize, Sequelize) =>{
    const Dev = sequelize.define("DEVELOPER",{
        "DEVUSERNAME":{type: Sequelize.STRING, allowNull: false, unique: true},
        "STUDIONAME":{type: Sequelize.STRING, allowNull: false},
        "PASSWORD":{type: Sequelize.STRING, allowNull: false},
        "EMAIL":{type: Sequelize.STRING, allowNull:false},
        "BANKACCOUNT":{type: Sequelize.STRING, allowNull:false},
        "CITY":{type: Sequelize.STRING, allowNull:false},
        "COUNTRY":{type: Sequelize.STRING, allowNull:false},
        "PHONE":{type: Sequelize.STRING, allowNull:false},
    })
    return Dev
}