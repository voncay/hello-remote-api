const mongoose = require('mongoose')
const { Schema, model } = mongoose

// job_post
const Job = new Schema(
  {
    job_title:          { type : String, required : true },
    job_description:    { type : String, required : true },
    job_location:       { type : String, required : true },
    posted_by:          { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Recruiter'
    },
    for_company:        {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Company'
    },
    created_date:       { type: Date, default: Date.now() }
  }
)

module.exports = model('Job', Job)
