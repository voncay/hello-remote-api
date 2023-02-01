const mongoose = require('mongoose')
const { Schema, model } = mongoose

// education_detail
const Education = new Schema(
  {
    seeker_id:        { type : Number, required : true },
    degree_name:      { type : String, required : true },
    institution_name: { type : String, required : true },
    starting_date:    { type : Date, required : true },
    completion_date:  { type : Date }
  }
)

module.exports = model('Education', Education)
