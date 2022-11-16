const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Job, Skill } = require('../models');

const getUsers = async (request, response, next) => {
	try {
		if (!request.user.admin) return next();
		const users = await User.findAll({
			include: [{ model: Job, include: Skill }]
		});
		response.json(users);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const getUserById = async (request, response, next) => {
	try {
		const userId = request.body.id || request.user.id;
		const user = await User.findByPk(userId, {
			include: Job
		});
		response.json(user);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const updateUser = async (request, response, next) => {
	try {
		const userId = request.body.id || request.user.id;
		const userToUpdate = await User.findByPk(userId);
		let encrypt;
		const { password } = request.body;
		if (password) {
			const saltRounds = 10;
			encrypt = await bcrypt.hash(password, saltRounds);
		}
		const updatedUser = await userToUpdate.update(
			request.body
		);
		response.json(updatedUser);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const deleteUser = async (request, response, next) => {
	try {
		const userId = request.body.id || request.user.id;
		const userToDelete = await User.findByPk(userId);
		await userToDelete.destroy();
		response.json(userToDelete);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const signup = async (request, response, next) => {
	const { firstName, lastName, email, password } =
		request.body;
	if (!firstName || !lastName || !email || !password) {
		return response
			.status(400)
			.send('All fields must be filled out');
	}
	const saltRounds = 10;
	const hashedPass = await bcrypt.hash(
		password,
		saltRounds
	);
	const userCredential = {
		firstName,
		lastName,
		email,
		password: hashedPass
	};
	try {
		const alreadyExistUser = await User.findOne({
			where: { email }
		});
		if (alreadyExistUser) {
			return response
				.status(409)
				.send('Email already exist');
		}
		const createdUser = await User.create(userCredential);
		const user = {
			id: createdUser.id,
			email: createdUser.email
		};
		// log in a user after signed up is successful
		request.login(user, error => {
			if (error) return next(error);
			console.log('Successfully signed up!');
			return response.status(201).json(user);
		});
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const login = (request, response, next) => {
	passport.authenticate('local', (error, user, info) => {
		if (error) return next(error);
		if (info)
			return response.status(401).json(info.message);
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
	request.logout(error => {
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
	logout
};
