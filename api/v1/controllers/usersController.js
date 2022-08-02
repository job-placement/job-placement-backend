/*

CRUD actions

*/

const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const passport = require('passport');

const getUsers = async (request, response, next) => {
  try {
    const users = await User.findAll()
    response.json(users)
  } catch (e) {
    console.log(e)
  }
}

const postLogin = (request, response, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  });
  console.log('successfully logged in');
}

const postSignup = async (request, response, next) => {
  const { firstName, lastName, email, password } = request.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const userCredential = {
    firstName,
    lastName,
    email,
    password: hashedPassword
  }

  try {
    const alreadyExistUser = await User.findOne({ where: { email }});
    if (alreadyExistUser)
      return response.status(409).send('Email already exist');

    const createdUser = await User.create(userCredential);

    const user = {
      id: createdUser.id,
      email: createdUser.email
    }

    console.log('signup user: ', user);
    // console.log('db signup users: ', users)
    request.login(user, (error) => {
      console.log('this is th bug: ', error.message)
      if (error) return next(error);
      console.log('successfully register');
      response.redirect('/');
    });
  } catch(error) {
    console.log('this is th bug: ', error.message)
    console.error(error);
  }
}

const postLogout = async (request, response, next) => {
  request.logout((error) => {
    if (error) return next(error);
    console.log('successfully logged out');
    response.redirect('/');
  });
}

module.exports = {
  getUsers,
  postLogin,
  postSignup,
  postLogout
}

