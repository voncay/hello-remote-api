const express = require('express')
const seekerRouter = express.Router()

const { getSeekers, postSeeker, findSeeker, updateSeeker, deleteSeeker } = require('../controllers/seekerController')

seekerRouter.route('/seekers')
  .get(getSeekers)
  .post(postSeeker)  //profile

seekerRouter.route('/seekers/:id')
  .get(findSeeker)
  .put(updateSeeker)
  .delete(deleteSeeker)

module.exports = seekerRouter
