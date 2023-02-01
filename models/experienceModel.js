const mongoose = require('mongoose')
const { Schema, model } = mongoose

// experience_detail
const Experience = new Schema(
  {
    seeker_id:          { type : Number, required : true },
    company_name: { type : String, required : true },
    job_title:      { type : String, required : true },
    job_location: { type : String, required : true },
    job_description: { type : String, required : true },
    start_date:    { type : Date, required : true },
    end_date:  { type : Date }
  }
)

module.exports = model('Experience', Experience)
