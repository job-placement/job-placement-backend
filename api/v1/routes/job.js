const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const Job = require('../models/Job')
const jobsController = require('../controllers/jobsController')


/*

TODO: finish building remaining endpoints to support CRUD actions

*/
router.post('/users/:usedId/create-job', jobsController.createJob)
router.get('/jobs', jobsController.getJobs)
router.get('/jobs/:jobId', jobsController.getJobById)
router.get('/users/:userId/jobs/:jobId', jobsController.getJobByUser)
router.put('/users/:userId/jobs/:jobId', jobsController.editJob)
router.delete('/users/:userId/jobs/:jobId/delete', jobsController.deleteJob)

module.exports = router