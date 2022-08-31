/*

CRUD actions

*/

const { User, Job } = require('../models/index');
const bcrypt = require('bcrypt');
const passport = require('passport');

const getUsers = async (request, response, next) => {
  try {
    const users = await User.findAll({
      include:Job
    })
    response.json(users)
  } catch (e) {
    console.log(e)
  }
};

const getUserById = async (request, response, next) => {
  try {
    const userId = request.params.userId
    const user = await User.findAll({
      where:  {
        id: userId
      },
      include: Job
    })
    response.json(user)
  } catch (e) {
    console.log(e)
  }
};

const updateUser = async (request, response, next) => {
  try {
    const userToUpdate = await User.findByPk(request.params.userId);
    bcrypt.hash(request.body.password, 3, async function(err, encrypted){
    const updatedUser = await userToUpdate.update({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password:encrypted
    });
      if(updateUser){
        response.status(201).send("user has been updated");
      }
    })
} catch (e) {
    console.log(e)
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const userToDelete = await User.findByPk(request.params.id);
    const userDeteleted = await userToDelete.destroy()
    if(userDeteleted){
      response.status(201).send("user has been deleted");
    }
  } catch (e) {
    console.log(e)
  }
};

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

    request.login(user, (error) => {
      if (error) return next(error);
      // Location 1: redirect
      console.log('Successfully signed up!')
      response.status(201).send('Successfully signed up, please redirect to the homepage');
    });
  } catch(error) {
    console.error(error);
  }
};

const postLogin = (request, response, next) => {
  passport.authenticate('local')(request, response, next);
};

const postLogout = async (request, response, next) => {
  request.logout((error) => {
    if (error) return next(error);
    // Location 3: redirect
    console.log('Successfully logged out!');
    response.send('Successfully logged out, please redirect to the homepage');
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  postLogin,
  postSignup,
  postLogout
};
