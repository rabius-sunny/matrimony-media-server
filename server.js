import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connection from './configs/db.js'
import PostRouter from './routes/post.js'
import userRouter from './routes/user.js'

const PORT = process.env.PORT || 5000

const app = express()

// Middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Database Connetion
connection()

// Routes
app.use('/', PostRouter)
app.use('/', userRouter)

app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))
