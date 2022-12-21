const { DataTypes } = require('sequelize')
const db = require('./config')
const Product = require('./Product')
const { User } = require('./User')

const Order = db.define('order', {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    trasaction_id: {
        type: DataTypes.STRING,
        unique: true
    },
    order_status: {
        type: DataTypes.ENUM('in delivery', 'dilevred', 'returned', 'pending'),
        defaultValue: "pending"
    },
    amount_paid: {
        type: DataTypes.INTEGER,
    }
})

Product.hasMany(Order)
Order.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

module.exports =  Order 
