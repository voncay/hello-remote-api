const Seeker = require('../models/seekerModel')

const getSeekers = async (req, res) => {
  try{
    let seekers = await
    // const seekers = await
    Seeker
    .find()
    .populate('user_account')
    res.status(200).json(seekers)
  } catch(err){
    console.log(err, "err");
    res.status(500).json({
      success: false,
      msg: err.message
    })
  }
}

const postSeeker = async (req, res) => {
  try{
    const newSeeker = await Seeker.create(req.body)
    res.status(201).json(newSeeker)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

const findSeeker = async (req, res) => {
  try {
    const foundSeeker = await Seeker.findById(req.params.id)
    res.status(200).json(foundSeeker)
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

const updateSeeker = async (req, res) => {
  try {
    const updatedSeeker = await Seeker.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updatedSeeker)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

const deleteSeeker = (req, res) => {
  try {
    // console.log(req, "req deleteSeeker")
    Seeker
    .deleteOne({ _id: req.params.id })
    .then(() => res.json('Seeker deleted sucessfully'))
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

module.exports = { getSeekers, postSeeker, findSeeker, updateSeeker, deleteSeeker }
