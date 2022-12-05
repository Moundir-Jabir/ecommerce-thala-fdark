const { User } = require('../models/User')
const jwt = require('jsonwebtoken')
const { transporter } = require('../config')
const { v1 } = require('uuid')
const { cryptPassword } = require('../helpers')

exports.signup = (req, res) => {
    req.body.password = cryptPassword(req.body.password)
    User.create(req.body)
        .then(data => {
            let user = data.dataValues
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            transporter.sendMail({
                from: `"Marhaba Application" <${process.env.EMAIL}>`,
                to: user.email,
                subject: "Vérification d'adresse mail pour votre compte Marhaba",
                html: `<p>cliquer sur ce <a href="${process.env.HOSTNAME}/api/auth/emailVerification/${token}">lien</a> pour vérifier votre adresse mail</p>`
            }).then(e => {
                return res.json({ user, message: 'An email is sent to your email for verification' })
            })
        })
        .catch(erreur => res.status(400).json({ erreur: "email deja existe" }))
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ where: { email } })
        .then(data => {
            if (!data)
                return res.status(404).json({
                    erreur: 'Not found user with this email'
                })
            if (data.emailIsVerified == false)
                return res.status(401).json({ erreur: "Email is not verified, plese check your email" })
            if (cryptPassword(password) != data.password)
                return res.status(401).json({
                    erreur: 'Incorect password'
                })
            const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET)
            res.cookie('token', token, { expire: new Date() + 8062000 })
            return res.json({ token, user: data })
        })
        .catch(err => {
            return res.status(500).json({
                erreur: 'database erreur'
            })
        })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'User Signout' })
}

exports.validateMail = (req, res) => {
    req.profil.emailIsVerified = true
    req.profil.save().then(result => res.send(`Your email ${req.profil.email} is verified`))
}

exports.forgetpassword = (req, res) => {
    req.check('email', 'Email is required').notEmpty().isEmail().withMessage('Email is invalide')
    const errors = req.validationErrors()
    if (errors)
        return res.status(400).json({
            erreur: errors[0].msg
        })
    User.findOne({ where: { email: req.body.email } })
        .then(data => {
            if (!data)
                return res.status(404).json({
                    erreur: 'Not found user with this email'
                })
            data.codeReset = v1()
            data.save().then((e) => {
                const token = jwt.sign({ id: data.id, codeReset: data.codeReset }, process.env.JWT_SECRET, { expiresIn: 600 })
                transporter.sendMail({
                    from: `"Marhaba Application" <${process.env.EMAIL}>`,
                    to: data.email,
                    subject: "Réinitialisation de mot de passe pour votre compte Marhaba",
                    html: `<p>cliquer sur ce <a href="${process.env.FRONTENDHOSTNAME}/resetpassword/${token}">lien</a> pour réinitialiser votre mot de passe de votre compte Marhaba</p>`
                }).then(e => res.json({
                    message: 'An email is sent to reset your password'
                }))
            })
        })
        .catch(err => {
            return res.status(500).json({
                erreur: 'database erreur'
            })
        })
}

exports.resetpassword = (req, res) => {
    if (req.codeReset == req.profil.codeReset) {
        req.check('password', 'new password is required for reset').notEmpty().isLength({ min: 8, max: 20 }).withMessage('Password must between 8 and 20 caracteres')
        const errors = req.validationErrors()
        if (errors)
            return res.status(400).json({
                erreur: errors[0].msg
            })
        let user = req.profil
        user.password = cryptPassword(req.body.password)
        user.save().then(result => res.json({
            message: `Your password is reset succesfuly`
        }))
    }
    else {
        return res.status(400).json({
            erreur: 'Invalid Token'
        })
    }
}