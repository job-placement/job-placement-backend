const router = require('express').Router();
const {
	getSkills
} = require('../controllers/skillsController');

router.route('/').get(getSkills);

module.exports = router;
