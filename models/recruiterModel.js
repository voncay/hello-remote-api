const mongoose = require('mongoose')
const { Schema, model } = mongoose

// recruiter_profile
const Recruiter = new Schema(
  {
    user_id:              { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    first_name:           { type : String, required : true },
    last_name:            { type : String, required : true },
    company_name:         { type : String, required : true }, // later one companyModel to many recuiter
    company_description:  { type : String, required : true },
    recruiter_type:       { type : String, enum: ['in-house', 'head-hunter'], required : true }
  }
)

module.exports = model('Recruiter', Recruiter)
