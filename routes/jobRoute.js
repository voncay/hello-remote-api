// const express = require('express')
// const profileRouter = express.Router()

const jobRouter = require('express').Router()

const Job = require('../models/jobModel')

jobRouter.post('/jobs', async (req, res ) => {
  try{
    const newJob = await Job.create(req.body)
    res.status(201).json(newJob)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
})

jobRouter.post('/applyjob', async (req, res ) => {
})

module.exports = jobRouter
