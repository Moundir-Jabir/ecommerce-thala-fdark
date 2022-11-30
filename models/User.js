const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1 } = require('uuid')
const { profil } = require('../config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    phone: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    deliveryAdresse: {
        type: String,
        maxlength: 2000
    },
    photo: {
        data: {
            type: Buffer, default: profil
        },
        contentType: {
            type: String, default: 'image/png'
        }
    },
    role: {
        type: String,
        default: "client",
        enum: ["manager", "client"]
    },
    city: {
        type: String,
        maxlength: 30
    },
    salt: String,
    hashed_password: {
        type: String,
        required: true
    },
    codeReset: {
        type: String
    }
}, { timestamps: true })

userSchema.virtual('password').set(function (password) {
    this._password = password
    this.salt = v1()
    this.hashed_password = this.cryptPassword(password)
}).get(function () {
    return this._password
})

userSchema.methods = {
    authenticated: function (plainText) {
        return this.cryptPassword(plainText) === this.hashed_password
    },
    cryptPassword: function (password) {
        if (!password)
            return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    }
}

module.exports = mongoose.model('User', userSchema)