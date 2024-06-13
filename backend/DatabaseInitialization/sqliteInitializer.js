const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    dialect : "sqlite",
    storage: "./DatabaseInitialization/AloneInTheGroup.sqlite"
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require("./userTableInitializer")(sequelize, Sequelize)
db.game = require("./gameTableInitializer")(sequelize, Sequelize)
db.transaction = require("./transactionTableInitializer")(sequelize, Sequelize)
db.purchase = require("./purchaseTableInitializer")(sequelize, Sequelize)
db.developer=require("./devTableInitializer")(sequelize, Sequelize)

db.transaction.belongsTo(db.user, {foreignKey: {allowNull: false}})
db.user.hasMany(db.transaction)
db.user.hasMany(db.purchase)
db.purchase.belongsTo(db.user, {foreignKey: {allowNull: false}})
db.game.hasMany(db.purchase)
db.purchase.belongsTo(db.game, {foreignKey: {allowNull: false}})
db.transaction.hasMany(db.purchase)
db.purchase.belongsTo(db.transaction, {foreignKey: {allowNull: false}})
db.developer.hasMany(db.game)
db.game.belongsTo(db.developer, {foreignKey: {allowNull: false}})

db.sequelize.sync()
module.exports = db