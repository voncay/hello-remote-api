const mongoose = require('mongoose')
const { Schema, model } = mongoose

// seeker_profile
const Seeker = new Schema(
  {
    user_account:       { type : Number, required : true },
    first_name:         { type : String, required : true },
    last_name:          { type : String, required : true },
    current_salary:     { type : Number },
    education_detail:   [{ type : mongoose.Schema.Types.ObjectId, ref : 'Education' }],
    experience_detail:  [{ type : mongoose.Schema.Types.ObjectId, ref : 'Experience' }],
    skill_set:          [{ type : String }]
  }
)

module.exports = model('Seeker', Seeker)
