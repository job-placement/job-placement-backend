const express = require("express")
const router = express.Router()
const { body } = require('express-validator')
const User = require('../models/User')
const usersController = require('../controllers/usersController')
const jwtCheck =  require ("../../../server/app")

/*
TODO: apply DRY principle to redundant endpoint addresses

router.route('/login')
     .get(usersController.getLogin)
     .post(usersController.postLogin)

*/

router.get('/users', jwtCheck, usersController.getUsers)

router.get('/users/:userId',jwtCheck, usersController.getUserById)

router.put('/users/:userId',jwtCheck, usersController.updateUser)

router.delete('/users/:userId',jwtCheck, usersController.deleteUser)

router.get('/login', usersController.getLogin)

router.post('/login', usersController.postLogin)

router.get('/signup', usersController.getSignup)

router.post('/signup', usersController.postSignup)

router.post('/logout', usersController.postLogout)


module.exports = router