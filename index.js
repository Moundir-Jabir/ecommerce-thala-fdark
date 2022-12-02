require('dotenv').config()
const express = require('express')
const app = express()
//const expressValidator = require('express-validator')
//const cookieParser = require('cookie-parser')
//const cors = require('cors')

//Routers
//const authRouter = require('./routes/auth')
//const userRouter = require('./routes/user')

app.use(express.json())
//app.use(expressValidator())
//app.use(cookieParser())
//app.use(cors())
//app.use(express.static("public"))

// app.get('/api/docs', (req, res) => {
//   res.sendFile(__dirname + "/public/docs/index.html")
// })
// app.use('/api/auth', authRouter)
// app.use('/api/user', userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = app