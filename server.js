const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./configs/db.js')
const PostRouter = require('./routes/post.js')
const userRouter = require('./routes/user.js')
const adminRoute = require('./routes/admin.js')
const othersRoute = require('./routes/others.js')

const PORT = process.env.PORT || 5050

const app = express()

// Middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Database Connetion
connection()

// Routes
app.get('/', (req, res) => res.send('Route is working!'))
app.get('/check', (req, res) => res.send('Check is successfull!'))
app.use('/', PostRouter)
app.use('/', userRouter)
app.use('/', othersRoute)
app.use('/admin', adminRoute)

app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))
