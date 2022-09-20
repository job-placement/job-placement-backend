const router = require("express").Router();
const constroller = require('../controllers/usersController');
const { fowardLoggedInUser, checkIfLoggedIn, checkIfAdmin
} = require('../validations/userValidation');

router.route('/users')
	.get(checkIfLoggedIn, checkIfAdmin, constroller.getUsers)
	.get(checkIfLoggedIn, constroller.getUserById)
	.put(checkIfLoggedIn, constroller.updateUser)
	.delete(checkIfLoggedIn, constroller.deleteUser);

router.route('/signup')
	.post(fowardLoggedInUser, constroller.signup);

router.route('/login')
	.post(fowardLoggedInUser, constroller.login);

router.route('/logout')
	.post(checkIfLoggedIn, constroller.logout);

module.exports = router;
