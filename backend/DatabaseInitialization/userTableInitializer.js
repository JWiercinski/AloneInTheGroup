module.exports=(sequelize, Sequelize) =>{
    const User = sequelize.define("USERS",{
        "USERNAME":{type: Sequelize.STRING, allowNull: false, unique: true},
        "PASSWORD":{type: Sequelize.STRING, allowNull: false},
        "EMAIL":{type: Sequelize.STRING, allowNull:false},
        "FULLNAME":{type: Sequelize.STRING, allowNull:false}
    })
    return User
}