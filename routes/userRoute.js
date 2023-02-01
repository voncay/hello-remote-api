const express = require('express')
const userRouter = express.Router()
const { getUsers, postUser, findUser, updateUser, deleteUser } = require('../controllers/userController')

userRouter.route('/users')
  .get(getUsers)
  .post(postUser)

userRouter.route('/users/:id')
  .get(findUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = userRouter
