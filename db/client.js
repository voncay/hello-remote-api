const mongoose = require('mongoose')
require('dotenv').config()

try{
    const url = process.env.MONGO_URI
    mongoose.connect(url)
    console.log(`Connected to the DB`)
}

catch(err){
    console.log(err)
}