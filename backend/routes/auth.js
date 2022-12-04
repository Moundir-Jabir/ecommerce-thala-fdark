const express = require('express')
const router = express.Router()
const { userSignupValidator } = require('../middlewares/userValidator')
const { userByToken } = require('../middlewares/user')
const { signup, signin, signout, validateMail, forgetpassword, resetpassword } = require("../controllers/authController.js")

router.post('/register', userSignupValidator, signup)
router.post('/login', signin)
router.get('/logout', signout)
router.get('/emailVerification/:token', validateMail)
router.post('/forgetpassword', forgetpassword)
router.patch('/resetpassword/:token', resetpassword)

router.param('token', userByToken)

module.exports = router