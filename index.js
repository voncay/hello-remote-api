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


const authRouter = require('./routes/authRouter')
const userRouter = require('./routes/userRoute')
const seekerRouter = require('./routes/seekerRoute')
const recruiterRouter = require('./routes/recruiterRoute')

app.use('/auth', authRouter )
app.use('/api', userRouter, seekerRouter, recruiterRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

// Export the Express API
module.exports = app
