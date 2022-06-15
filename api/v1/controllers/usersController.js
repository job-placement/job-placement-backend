/*

CRUD actions

*/

const { User, Job } = require('../models/index')
const bcrypt = require('bcrypt');


const getUsers = async (request, response, next) => {
  try {
    const users = await User.findAll({
      include:Job
    })
    response.json(users)
  } catch (e) {
    console.log(e)
  }
}

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
}

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
}

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
}

// Not sure if it is useful || or how we are going to render angular files here
// server side tenplate engines might be easier to render(handlebar, pug ....) 
const getLogin = async (request, response, next) => {
  try {
    // TODO: send user to login page
     //response.render('some file')
  } catch (e) {
    console.log(e)
  }
}
// will need passport configuration to complete login action
const postLogin = async (request, response, next) => {
  //find a user in the db by matching the name in the req.body
  const thisUser = await User.findOne({
    where: {email: req.body.email}
  })
  //if found ,compare user password to a hash from db
  if(!thisUser){
    response.send('user not found')
  }
  else{
    bcrypt.compare(req.body.password, thisUser.password, async function(err, name){
      if(name){
        //res.send(`Logged as, ${thisUser.name}`)
        let user = thisUser.name
        response.status(200).send({"loginAs":user})
      }
      else{
        response.send('password do not match')
      }
    }) 
  }
}
// Not sure if it is useful || or how we are going to render angular files here
// server side tenplate engines might be easier to render(handlebar, pug ....) 
const getSignup = async (request, response, next) => {
  try {
    //response.render('some file')
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
        //response.rediect("/login")
        response.send("A new user has been created");
      }
    })
  } catch (e) {
    //response.rediect("/signup")
    console.log(e)
  }
}
// will need passport configuration to complete login action
const postLogout = async (request, response, next) => {
  try {
    // req.logOut(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //response.redirect("/login");
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout
}

