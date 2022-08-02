const { response } = require('express');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const path = require('path');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('../api/v1/routes/user');
const jobRoutes = require('../api/v1/routes/job');
// const authRouter = requeire('../api/v1/routes/auth');

app.use(userRoutes);
app.use(jobRoutes);
// app.use(authRouter);


/* Error handling redirects

const errorController = require('../api/v1/controllers/errorsController')

app.get('/500', errorController.get500Page)

app.use(errorController.get404Page)


*/


app.listen(PORT, function() {
    console.log(`Listening to port: ${PORT}`);
});
