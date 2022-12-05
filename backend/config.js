const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORDEMAIL
    },
})