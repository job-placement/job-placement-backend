const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const { User } = require("../../../server/db");

passport.use(new LocalStrategy(
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email }});

      bcrypt.compare(password, user.password, (error, result) => {
        if (error) done(error);
        if (!user || !result)
          return done(null, false, { message: 'Incorrect Email or Password!' });

        console.log('localStategy user: ', user);
        return done(null, user);
      });
    } catch(error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('serializing user: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing user: ', id);
  User.findById(id, (error, user) => {
    done(error, user);
  });
});
