exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email is required').notEmpty().isEmail().withMessage('Email is invalide')
    req.check('password', 'Password is required').notEmpty().isLength({ min: 8, max: 20 }).withMessage('Password must between 8 and 20 caracteres')
    const errors = req.validationErrors()
    if (errors)
        return res.status(400).json({
            erreur: errors[0].msg
        })
    next()
}