const router = require('express').Router();
const controller = require('../controllers/jobsController');
const {
	checkIfLoggedIn
} = require('../validations/userValidation');

router
	.route('/')
	.get(controller.getJobs)
	.post(checkIfLoggedIn, controller.createJob);

router
	.route('/:jobId')
	.get(controller.getJobById)
	.put(checkIfLoggedIn, controller.editJob)
	.delete(checkIfLoggedIn, controller.deleteJob);

module.exports = router;
