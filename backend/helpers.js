const crypto = require('crypto')

exports.cryptPassword = (password) => {
    return crypto.createHmac('sha1', "kjhsdkfhkjsh")
        .update(password)
        .digest('hex')
}