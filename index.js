const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

// connect to front app
const cors = require('cors')
app.use(cors())

// connect to mongodb
require('./db/client')

// use env variables
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Welcome to this API')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
