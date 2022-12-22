const { DataTypes } = require('sequelize')
const db = require('./config')
const Order = require('./Order')
const Product = require('./Product')

const OrderedProduct = db.define('ordered_product', {
    order_product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity_ordered: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.INTEGER
    },
    reviews: {
        type: DataTypes.INTEGER,
    },
    comments: {
        type: DataTypes.STRING,
    }
})

Product.hasMany(OrderedProduct)
OrderedProduct.belongsTo(Product)

Order.hasMany(OrderedProduct)
OrderedProduct.belongsTo(Order)

module.exports =  OrderedProduct 
