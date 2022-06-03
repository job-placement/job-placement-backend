const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const Skill = require('../models/Skill')
const skillsController = require('../controllers/skillsController')


/*

TODO: finish building remaining endpoints to support CRUD actions

*/

router.get('/skills', skillsController.getSkills)


module.exports = router