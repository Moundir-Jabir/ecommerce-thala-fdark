//codepromo model
const { DataTypes } = require('sequelize')
const db = require('./config')
// const Category = require('./Category');


const Product = db.define('product', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qauntity_purchased: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promotion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promo_expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
   
})
//   Category.hasMany(Product);
//   Product.belongsTo(Category);

module.exports = Product