const express = require('express')
const userRouter = express.Router()
const verify = require('../middlewares/verify')

// const { getUsers, postUser, findUser, findVerifiedUser, updateUser, deleteUser } = require('../controllers/userController')
const { getUsers, findUser, findVerifiedUser, updateUser, deleteUser } = require('../controllers/userController')

userRouter.route('/users')
  .get(getUsers)
  // .post(postUser)  --> create user by /auth/register only

// by id  
userRouter.route('/users/:id')
  .get(findUser)
  .put(updateUser)
  .delete(deleteUser)

// userRouter.get('/user', verify, async (req, res) => {
//     try{
//         res.json(req.user)
//     } catch(err){
//         res.json(err)
//     }
// })

// userRouter.route('/user').get(verify, async (req, res) => {
//     try{
//         res.json(req.user)
//     } catch(err){
//         res.json(err)
//     }
//   }
// )

userRouter.route('/user')
  .get(verify, findVerifiedUser)

module.exports = userRouter
