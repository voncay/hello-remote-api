const User = require('../models/userModel')

const getUsers = async (req, res) => {
  try{
    const users = await User.find()
    res.status(200).json(users)
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

// find by authenticated token with middleware verify
const findVerifiedUser = async (req, res) => {
  try{
    res.json(req.user)
  } catch(err){
    res.json(err)
  }
}

// create authenticated user only
// const postUser = async (req, res) => {
//   try{
//     const newUser = await User.create(req.body)
//     res.status(201).json(newUser)
//   }

//   catch(err){
//     res.status(500).json({ error : err.message })
//   }
// }

// find user by id
const findUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id)
    res.status(200).json(foundUser)
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

// update user by id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body) // update = the object updated
    res.status(200).json(updatedUser)
  }

  catch(err){
    res.status(500).json({ error : err.message })
  }
}

// delete by id
const deleteUser = (req, res) => {
  try {
    User
    .deleteOne({ _id: req.params.id })
    .then(() => res.json('User deleted sucessfully'))
  } catch(err){
    res.status(500).json({ error : err.message })
  }
}

module.exports = { getUsers, findUser, findVerifiedUser, updateUser, deleteUser }
// module.exports = { getUsers, postUser, findUser, findVerifiedUser, updateUser, deleteUser } // --> post user by authRouter only
