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

router.get('/users/:userId',
     usersController.ensureAuthenticated,
     usersController.getUserById);

router.put('/users/:userId',
     usersController.ensureAuthenticated,
     usersController.updateUser);

router.delete('/users/:userId',
     usersController.ensureAuthenticated,
     usersController.deleteUser);

router.post('/signup',
     usersController.fowardAuthenticated,
     usersController.postSignup);

router.post('/login',
     usersController.fowardAuthenticated,
     usersController.postLogin);

router.post('/logout', usersController.postLogout);

module.exports = router;