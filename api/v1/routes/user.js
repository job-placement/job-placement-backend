const router = require('express').Router();
const constroller = require('../controllers/usersController');
const { fowardLoggedInUser, checkIfLoggedIn
	} = require('../validations/userValidation');

router.route('/')
	.get(checkIfLoggedIn, constroller.getUsers,
		constroller.getUserById)
	.put(checkIfLoggedIn, constroller.updateUser)
	.delete(checkIfLoggedIn, constroller.deleteUser);

router.route('/signup')
	.post(fowardLoggedInUser, constroller.signup);

router.route('/login')
	.post(fowardLoggedInUser, constroller.login);

router.route('/logout')
	.post(checkIfLoggedIn, constroller.logout);

module.exports = router;
