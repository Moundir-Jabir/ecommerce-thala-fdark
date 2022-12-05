const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

exports.userById = (req, res, next, id) => {
    User.findByPk(id)
        .then(data => {
            req.profil = data
            next()
        })
        .catch(err => {
            return res.status(404).json({
                error: 'User not found'
            })
        })
}

exports.userByToken = (req, res, next, token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.codeReset = payload.codeReset
    this.userById(req, res, next, payload.id)
}