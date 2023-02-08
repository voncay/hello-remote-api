const mongoose = require('mongoose')
const { Schema, model } = mongoose

// recruiter_profile
const RecruiterSchema = new Schema(
  {
    user_account:     {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'User',
                        required: true
                      },
    first_name:       { type : String, required : true },
    last_name:        { type : String, required : true },
    related_company:  {
                        type : mongoose.Schema.Types.ObjectId,  // does it exist or fill the form
                        ref : 'Company',
                        required: true
                      },
    recruiter_type:   {
                        type : String,
                        enum: ['in-house', 'head-hunter'],
                        required : true
                      }
  }
)

module.exports = model('Recruiter', RecruiterSchema)
