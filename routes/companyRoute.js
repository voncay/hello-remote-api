// const express = require('express')
// const profileRouter = express.Router()

const companyRouter = require('express').Router()

const Company = require('../models/companyModel')

companyRouter.post('/companies', async (req, res ) => {
  try{
    const newCompany = await Company.create(req.body)
    res.status(201).json(newCompany)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
})

companyRouter.get('/companies', async (req, res ) => {
})

module.exports = companyRouter
