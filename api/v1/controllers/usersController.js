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
    // log in a user after signed up is successful
    request.login(user, (error) => {
      if (error) return next(error);
      // Location 1: redirect to the homepage
      console.log('Successfully signed up!');
      return response.status(201).json(user);
    });
  } catch(error) {
    console.error(error);
  }
};

const postLogin = (request, response, next) => {
  passport.authenticate('local', (error, user, info)=> {
    if (error) return next(error);
    if (info) return response.status(401).json(info.message);
    // function used to log in a user
    request.logIn(user, error => {
      if (error) return next(error);
      // Location 2: redirect to the homepage
      console.log('Successfully logged in!');
      return response.status(200).json(user);
    });
  })(request, response, next);
};

const postLogout = async (request, response, next) => {
  request.logout((error) => {
    if (error) return next(error);
    // Location 3: redirect to homepage or login
    console.log('Successfully logged out!');
    // send a string but ideally the user
    response.status(200).send('Successfully logged out');
  });
};

// only allow logged in user to proceed
const ensureAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) return next();
  // Location 4: redirect to login page
  console.log('Access denied, you must log in to proceed');
  response.status(401).send('Please log in');
}

// prevent logged in user to visit login and signup page
const fowardAuthenticated = (request, response, next) => {
  if (!request.isAuthenticated()) {
    return next();
  }
  // Location 5: redirect to  homepage
  console.log('Access denied, you are already logged in')
  response.status(301).send('You are already logged in');
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  postLogin,
  postSignup,
  postLogout,
  ensureAuthenticated,
  fowardAuthenticated
};
