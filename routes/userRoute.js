const express = require('express')
const userRouter = express.Router()
const { getAllUsers, postUser, findUser, updateUser, deleteUser } = require('../controllers/userController')

userRouter.route('/users')
  .get(getAllUsers)
  .post(postUser)

userRouter.route('/users/:id')
  .get(findUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = userRouter
