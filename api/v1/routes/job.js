const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const Job = require('../models/Job')
const jobsController = require('../controllers/jobsController')


/*

TODO: finish building remaining endpoints to support CRUD actions

*/
router.post('/jobs', jobsController.createJob)
router.get('/jobs', jobsController.getJobs)


module.exports = router