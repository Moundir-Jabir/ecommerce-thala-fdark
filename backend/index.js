require('dotenv').config()
const express = require('express')
const app = express()
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./models/config')

//Routers
//const authRouter = require('./routes/auth')

app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
        db.sync().then(e => console.log('sync'))
            .catch(err => console.log(err))
    })
    .catch((error => console.error('Unable to connect to the database:', error)))

//Routes
//app.use('/api/auth', authRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = app