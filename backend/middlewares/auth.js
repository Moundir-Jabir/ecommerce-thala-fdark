const expressJWT = require('express-jwt')
// verifie si token existe
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})
//verifie si user est autorisé
exports.isAuth = (req, res, next) => {
    if(req.auth.role == 'manager')
        return next()
    let user = req.profil && req.auth && (req.profil.id == req.auth.id)
    if(!user)
        return res.status(403).json({
            error: 'Access denied'
        })
    next()
}
// verifie si le token est admin
exports.isAdmin = (req, res, next) => {
    if(req.auth.role != 'manager')
        return res.status(403).json({
            error: 'Admin ressource, Access denied !'
        })
    next()
}