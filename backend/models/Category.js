const { DataTypes } = require('sequelize')
const db = require('./config')

const Category = db.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category_image: {
        type: DataTypes.STRING,
    }
})

module.exports =  Category 
