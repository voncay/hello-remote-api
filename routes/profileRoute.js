// const express = require('express')
// const profileRouter = express.Router()

const profileRouter = require('express').Router()

const Seeker = require('../models/seekerModel')
const Recruiter = require('../models/reruiterModel')

profileRouter.post('/recruiters', async (req, res ) => {
  try{
    const newRecruiter = await Recruiter.create(req.body)
    res.status(201).json(newRecruiter)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
})

profileRouter.post('/seekers', async (req, res ) => {
  try{
    const newSeeker = await Seeker.create(req.body)
    res.status(201).json(newSeeker)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
})

module.exports = profileRouter
