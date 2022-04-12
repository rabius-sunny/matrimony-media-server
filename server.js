import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const PORT = process.env.PORT || 5000

const app = express()

// Middlewares
require('dotenv').config()
app.use(bodyParser.json())
app.use(cors())




app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))