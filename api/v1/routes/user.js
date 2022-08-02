const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');

/*
TODO: apply DRY principle to redundant endpoint addresses

router.route('/login')
     .get(usersController.getLogin)
     .post(usersController.postLogin)

*/

router.get('/users', usersController.getUsers);

router.get('/users/:userId', usersController.getUserById);

router.put('/users/:userId', usersController.updateUser);

router.delete('/users/:userId', usersController.deleteUser);

router.post('/signup', usersController.postSignup);

router.post('/login', usersController.postLogin);

router.post('/logout', usersController.postLogout);

module.exports = router;