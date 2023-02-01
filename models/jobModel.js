const mongoose = require('mongoose')
const { Schema, model } = mongoose

// job_post
const Job = new Schema(
  {
    posted_by:          { type : mongoose.Schema.Types.ObjectId, ref : 'Recruiter' },
    job_type:           { enum: ['contract', 'permanent']},
    job_description:    { type : String, required : true },
    job_location:       { type : String, required : true },
    created_date:       { type: Date, default: Date.now() }
  }
)

module.exports = model('Job', Job)
