const router = require("express").Router();
const { body } = require('express-validator');
const constroller = require('../controllers/usersController');
const { checkIfLoggedIn, fowardLoggedInUser,
				checkIfAdmin
			} = require('../validations/userValidation');

router.route('/users')
	.get(checkIfLoggedIn, checkIfAdmin, constroller.getUsers)
	.get(checkIfLoggedIn, constroller.getUserById)
	.put(checkIfLoggedIn, constroller.updateUser)
	.delete(checkIfLoggedIn, constroller.deleteUser);

router.route('/signup')
	.post(fowardLoggedInUser, constroller.postSignup);

router.route('/login')
	.post(fowardLoggedInUser, constroller.postLogin);

router.route('/logout')
	.post(checkIfLoggedIn, constroller.postLogout);

module.exports = router;
