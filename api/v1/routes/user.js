const express = require(express)
const router = express.Router()
const { body } = require('express-validator')
const User = require('../models/User')
const userController = require('../controllers/usersController')

/*
TODO: apply DRY principle to redundant endpoint addresses

router.route('/login')
     .get(userController.getLogin)
     .post(userController.postLogin)

*/

router.get('/login', userController.getLogin)

router.post('/login', userController.postLogin)

router.get('/signup', userController.getSignup)

router.post('/signup', userController.postSignup)

router.post('/logout', userController.postLogout)


module.exports = router