const express = require('express')
const recruiterRouter = express.Router()
// const { getRecruiters, postRecruiter, findRecruiter, updateRecruiter, deleteRecruiter } = require('../controllers/recruiterController')

const { getRecruiters, postRecruiter } = require('../controllers/recruiterController')


recruiterRouter.route('/recruiters')
  .get(getRecruiters)
  .post(postRecruiter)

// recruiterRouter.route('/recruiters/:user_id')
//   .get(findRecruiter)
//   .put(updateRecruiter)
//   .delete(deleteRecruiter)

module.exports = recruiterRouter
