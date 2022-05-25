/*

CRUD actions

*/

const { User } = require('../models/index')
const bcrypt = require('bcrypt');

const getUsers = async (request, response, next) => {
  try {
    const users = await User.findAll()
    response.json(users)
  } catch (e) {
    console.log(e)
  }
}

const getLogin = async (request, response, next) => {
  try {
    // TODO: send user to login page
  } catch (e) {
    console.log(e)
  }
}

const postLogin = async (request, response, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

const getSignup = async (request, response, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

const postSignup = async (request, response, next) => {
  try {
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    bcrypt.hash(newUser.password, 3, async function(err, encrypted){

      let userCreated = await User.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: encrypted
      });

      if (userCreated) {
        response.send("A new user has been created");
      }
    })
    

  } catch (e) {
    console.log(e)
  }
}

const postLogout = async (request, response, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getUsers,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout
}

