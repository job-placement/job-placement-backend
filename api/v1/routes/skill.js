const router = require("express").Router();
const { body } = require('express-validator');
const {
        getSkills
      } = require('../controllers/skillsController');

router.route('/')
  .get(getSkills);

module.exports = router;
