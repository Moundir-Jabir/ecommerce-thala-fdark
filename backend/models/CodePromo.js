//codepromo model
const { DataTypes } = require('sequelize')
const db = require('./config')

const CodePromo = db.define('codePromo', {
    code_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    date_expiration: {
        type: DataTypes.DATE,
        allowNull: false
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    promotion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = CodePromo 