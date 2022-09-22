const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3005;
const userRoutes = require('../api/v1/routes/user');
const jobRoutes = require('../api/v1/routes/job');
const skillRoutes = require('../api/v1/routes/skill');
const { db } = require('../api/v1/models');
const sessionStore = new SequelizeStore({ db });

require('../api/v1/controllers/passportController')(passport);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

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
app.use(skillRoutes);

app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(error.status || 500)
		.send(error.message || 'Internal server error!');
});

app.listen(PORT, () => {
	console.log(`Listening to port: ${PORT}`);
});
