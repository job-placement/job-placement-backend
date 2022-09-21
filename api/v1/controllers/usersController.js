const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Job, Skill } = require('../models');

const getUsers = async (request, response) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Job, include: Skill }
      ]
    });
    response.json(users);
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (request, response) => {
  try {
    const userId = request.body.id || request.user.id;
    const user = await User.findByPk(userId, {
      include: Job
    });
    response.json(user);
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (request, response) => {
  try {
    const userId = request.body.id || request.user.id;
    const userToUpdate = await User.findByPk(userId);
    const { firstName, lastName, email, password,
      image, resume, bio, experience } = request.body;
    const saltRounds = 10;
    const encrypt = await bcrypt.hash(password, saltRounds);
    const updatedUser = await userToUpdate.update({
      firstName: firstName || userToUpdate.firstName,
      lastName: lastName || userToUpdate.lastName,
      email: email || userToUpdate.email,
      password: encrypt || userToUpdate.password,
      image: image || userToUpdate.image,
      resume: resume || userToUpdate.resume,
      bio: bio || userToUpdate.bio,
      experience: experience || userToUpdate.experience
    });
    response.json(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (request, response) => {
  try {
    const userId = request.body.id || request.user.id;
    const userToDelete = await User.findByPk(userId);
    await userToDelete.destroy();
    response.json(userToDelete);
  } catch (error) {
    console.error(error)
  }
};

const signup = async (request, response, next) => {
  const { firstName, lastName, email, password
    } = request.body;
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  const userCredential = {
    firstName,
    lastName,
    email,
    password: hashedPass
  }
  try {
    const alreadyExistUser = await User.findOne({
      where: { email }
    });
    if (alreadyExistUser) {
      return response.status(409).send('Email already exist');
    }
    const createdUser = await User.create(userCredential);
    const user = {
      id: createdUser.id,
      email: createdUser.email
    }
    // log in a user after signed up is successful
    request.login(user, (error) => {
      if (error) return next(error);
      console.log('Successfully signed up!');
      return response.json(user);
    });
  } catch(error) {
    console.error(error);
  }
};

const login = (request, response, next) => {
  passport.authenticate('local', (error, user, info)=> {
    if (error) return next(error);
    if (info) return response.status(401).json(info.message);
    // function used to log in a user
    request.logIn(user, error => {
      if (error) return next(error);
      console.log('Successfully logged in!');
      return response.json(user);
    });
  })(request, response, next);
};

const logout = async (request, response, next) => {
  const user = request.user;
  request.logout((error) => {
    if (error) return next(error);
    console.log('Successfully logged out!');
    return response.json(user);
  });
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  signup,
  logout,
};
