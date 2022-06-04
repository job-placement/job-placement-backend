const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const JobSkill = require('../models/JobSkill')
const JobSkillsController = require('../controllers/jobSkillsController')


/*

TODO: finish building remaining endpoints to support CRUD actions

*/

router.get('/jobskills', JobSkillsController.getJobSkills)


module.exports = router