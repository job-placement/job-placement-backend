const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(
	session.Store
);

const { db } = require('../api/v1/models');
const sessionStore = new SequelizeStore({ db });

const app = express();

require('../api/v1/controllers/passportController')(
	passport
);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

app.use(helmet());
app.use(morgan('dev'));
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
		saveUninitialized: false
	})
);
sessionStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('../api/v1/routes'));

app.use((error, request, response, next) => {
	console.error(error.stack);
	response
		.status(error.status || 500)
		.send(error.message || 'Internal server error!');
});

module.exports = app;
