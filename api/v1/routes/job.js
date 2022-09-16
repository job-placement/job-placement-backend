const router = require("express").Router();
const { body } = require('express-validator');
const { getJobs, getJobById, createJob,
        getJobByUser, editJob, deleteJob
      } = require('../controllers/jobsController');
const { ensureAuthenticated
      } = require('../controllers/usersController');

router.route('/jobs')
	.get(getJobs);

router.route('/jobs/:jobId')
  .get(ensureAuthenticated, getJobById);

router.route('/users/:userId/create-job')
  .post(ensureAuthenticated, createJob);

router.route('/users/:userId/jobs/:jobId')
  .get(ensureAuthenticated, getJobByUser)
  .put(ensureAuthenticated, editJob);

router.delete('/users/:userId/jobs/:jobId/delete')
  .delete(ensureAuthenticated, deleteJob);

module.exports = router;
