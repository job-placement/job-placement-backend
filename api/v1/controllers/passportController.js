// const passport = require("passport");
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const { User } = require("../models");

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    // specifying the field to match our html form
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    // fuction to verify user credential
    async (email, password, done) => {
      try {
        // find user with the same email specified
        const user = await User.findOne({ where: { email }});
        // check if user exist
        if (!user)
          return done(null, false, { message: 'Incorrect Email or Password!' });

        // compare user password with the password in the database
        // then pass the outcome as the result
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) done(error);
          // check if password matches the password in the database
          if (!result)
            return done(null, false, { message: 'Incorrect Email or Password!' });

          /*
          When attempting to log in there is an error
          the request is returning 404 localhost:3005/login
          origin: localhost:4200/login
          */
          // console.log('user in loging: ', user);
          // return user if credential is a success
          return done(null, user);
        });
      } catch(error) {
        return done(error);
      }
    }
  ));

  // add user into our session located in the database
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // retrieve the user from the session that matches by id
  passport.deserializeUser(async (id, done) => {
    try {
      console.log('testing here');
      const user = await User.findByPk(id);
      done(null, user);
    } catch(error) {
      done(error);
    }
  });
}
