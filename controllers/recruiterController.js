const Recruiter = require('../models/recruiterModel')

const getRecruiters = async (req, res) => {
  try{
    let recruiters = await
    // const recruiters = await
    Recruiter
    .find()
    .populate('user_account')
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
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

// const findUser = async (req, res) => {
//   try {
//     const foundUser = await User.findById(req.params.id)
//     res.status(200).json(foundUser)
//   }

//   catch(err){
//     res.status(500).json({ error : err.message })
//   }
// }

// const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body) // update = the object updated
//     res.status(200).json(updatedUser)
//   }

//   catch(err){
//     res.status(500).json({ error : err.message })
//   }
// }

// const deleteUser = (req, res) => {
//   try {
//     User
//     .deleteOne({ _id: req.params.id })
//     .then(() => res.json('User deleted sucessfully'))
//   }

//   catch(err){
//     res.status(500).json({ error : err.message })
//   }
// }

module.exports = { getRecruiters, postRecruiter }

// module.exports = { getRecruiters, postRecruiter, findRecruiter, updateRecruiter, deleteRecruiter }
