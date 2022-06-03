const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const User = require('../models/User')
const usersController = require('../controllers/usersController')

/*
TODO: apply DRY principle to redundant endpoint addresses

router.route('/login')
     .get(usersController.getLogin)
     .post(usersController.postLogin)

*/

router.get('/users', usersController.getUsers)

router.put('/users/:userId', usersController.updateUser)

router.delete('/users/:userId', usersController.deleteUser)

router.get('/login', usersController.getLogin)

router.post('/login', usersController.postLogin)

router.get('/signup', usersController.getSignup)

router.post('/signup', usersController.postSignup)

router.post('/logout', usersController.postLogout)


module.exports = router