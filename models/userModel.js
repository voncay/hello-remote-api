const mongoose = require('mongoose')
const { Schema, model } = mongoose

// user_account
const User = new Schema(
  {
  
    email :     { type : String, required : true, unique: true },
    password:   { type: String, required : true },
    user_type:  {
      type: String,
      required : true,
      enum: {
        values: ['seeker', 'recruiter'],
        message: '{VALUE} is not supported'
      }
    }
  }, 
  { timestamps: true }
)

module.exports = model('User', User)
