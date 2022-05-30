/*

CRUD actions

*/

const { User } = require('../models/index')

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

