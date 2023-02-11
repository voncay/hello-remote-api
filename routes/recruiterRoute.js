const express = require('express')
const recruiterRouter = express.Router()
const verify = require('../middlewares/verify')

const { getRecruiters, postRecruiter, findRecruiter, findVerifiedRecruiter, updateRecruiter, deleteRecruiter } = require('../controllers/recruiterController')

recruiterRouter.route('/recruiters')
  .get(getRecruiters)
  .post(postRecruiter)

recruiterRouter.route('/recruiters/:id')
  .get(findRecruiter)
  .put(updateRecruiter)
  .delete(deleteRecruiter)

recruiterRouter.route('/recruiter')
  .get(verify, findVerifiedRecruiter)

module.exports = recruiterRouter
