const Recruiter = require('../models/recruiterModel')

const getRecruiters = async (req, res) => {
  try{
    let recruiters = await
    // const recruiters = await
    Recruiter
    .find()
    .populate('user_account')
    .populate('related_company')
    res.status(200).json(recruiters)
  } catch(err){
    console.log(err, "err");
    res.status(500).json({
      success: false,
      msg: err.message
    })
  }
}

const postRecruiter = async (req, res) => {
  try{
    const newRecruiter = await Recruiter.create(req.body)
    res.status(201).json(newRecruiter)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

// by id 
const findRecruiter = async (req, res) => {
  try {
    const foundRecruiter = await Recruiter.findById(req.params.id)
    res.status(200).json(foundRecruiter)
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

// by token
const findVerifiedRecruiter = async (req, res) => {
  try{

    const user = req.user
    // console.log(user, "user from findVerifiedRecruiter")
    // const foundRecruiter = await Recruiter.findOne({ 'user_account._id': user._id })
    const foundRecruiter = await Recruiter.findOne({ 'user_account': user })

    res.status(200).json(foundRecruiter)
    // res.json(req.user)
  } catch(err){
    res.json(err)
  }
}

const updateRecruiter = async (req, res) => {
  try {
    const updatedRecruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updatedRecruiter)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

const deleteRecruiter = (req, res) => {
  try {
    // console.log(req, "req deleteRecruiter")
    Recruiter
    .deleteOne({ _id: req.params.id })
    .then(() => res.json('Recruiter deleted sucessfully'))
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

module.exports = { getRecruiters, postRecruiter, findRecruiter, findVerifiedRecruiter, updateRecruiter, deleteRecruiter }
