const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const Job = require('../models/Job')
const jobsController = require('../controllers/jobsController')
const jwtCheck =  require ("../../../server/app")


/*

TODO: finish building remaining endpoints to support CRUD actions

*/
router.post('/users/:userId/create-job',jwtCheck, jobsController.createJob)
router.get('/jobs',jwtCheck, jobsController.getJobs)
router.get('/jobs/:jobId',jwtCheck, jobsController.getJobById)
router.get('/users/:userId/jobs/:jobId',jwtCheck, jobsController.getJobByUser)
router.put('/users/:userId/jobs/:jobId',jwtCheck, jobsController.editJob)
router.delete('/users/:userId/jobs/:jobId/delete',jwtCheck, jobsController.deleteJob)

module.exports = router