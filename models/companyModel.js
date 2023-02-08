const mongoose = require('mongoose')
const { Schema, model } = mongoose

const CompanySchema = new Schema(
  {
    company_name:         { type : String, required: true },
    company_description:  { type : String, required: true }
  }
)

module.exports = model('Company', CompanySchema)
