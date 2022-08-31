require('dotenv').config()
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db } = require('./db');
const sessionStore = new SequelizeStore({ db });
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();
const PORT = 3005;
const userRoutes = require('../api/v1/routes/user');
const jobRoutes = require('../api/v1/routes/job');
const jobSkillRoutes = require('../api/v1/routes/jobSkill');
const skillRoutes = require('../api/v1/routes/skill');

require('../api/v1/controllers/passportController')(passport);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

app.use(
	session({
		secret: process.env.SESSION_SECRET || 'keyboard cat',
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
	})
);
sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(userRoutes);
app.use(jobRoutes);
app.use(jobSkillRoutes);
app.use(skillRoutes);

/* Error handling redirects

const errorController = require('../api/v1/controllers/errorsController')

app.get('/500', errorController.get500Page)

app.use(errorController.get404Page)

*/

app.listen(PORT, function() {
	console.log(`Listening to port: ${PORT}`);
});
