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

router.post('/login', usersController.postLogin)

router.post('/signup', usersController.postSignup)

router.post('/logout', usersController.postLogout)


module.exports = router