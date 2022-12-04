const { DataTypes } = require('sequelize')
const db = require('./config')

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    emailIsVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deliveryAdresse: {
        type: DataTypes.STRING
    },
    photoProfil: {
        type: DataTypes.STRING,
        defaultValue: "images/user.jpeg"
    },
    role: {
        type: DataTypes.ENUM('manager', 'client'),
        defaultValue: "client"
    },
    city: {
        type: DataTypes.STRING
    },
    codeReset: {
        type: DataTypes.STRING
    }
}
)

module.exports = { User }