const router = require("express").Router();
const { body } = require('express-validator');
const {
				getUsers, getUserById, updateUser,
				deleteUser, postLogin, postSignup,
				postLogout, ensureAuthenticated,
				fowardAuthenticated
			} = require('../controllers/usersController');

router.route('/users')
	.get(getUsers);

router.route('/users/:userId')
	.get(ensureAuthenticated, getUserById)
	.put(ensureAuthenticated, updateUser)
	.delete(ensureAuthenticated, deleteUser);

router.route('/signup')
	.post(fowardAuthenticated, postSignup);

router.route('/login')
	.post(fowardAuthenticated, postLogin);

router.route('/logout')
	.post(ensureAuthenticated, postLogout);

module.exports = router;
