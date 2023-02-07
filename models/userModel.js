const mongoose = require('mongoose')
const { Schema, model } = mongoose

// user_account
const User = new Schema(
  {
    // _id:        { type: Schema.Types.ObjectId },  // test
    email: {
      type: String,
      required : true,
      unique: true,
      minLength: 6
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    },
    user_type: {
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
