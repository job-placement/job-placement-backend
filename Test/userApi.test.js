const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe.skip('Users API', () => {
	let loggedInUser, adminUser, errorUser, newUser, user;
	const loggedInAlready = 'You are already logged in';
	const loginToProceed = 'Please log in to proceed';
	const wrongCredential = 'Incorrect Email or Password!';
	const missingField = 'All fields must be filled out';
	const missingCredential = 'Missing credentials';
	const userCredential = {
		email: 'nmorales@gmail.com',
		password: 'happy'
	};

	beforeAll(async () => {
		await seed();
		const login = await agent
			.post('/api/users/login')
			.send({
				email: 'brucewillis@aol.com',
				password: 'happy'
			});
		adminUser = login.headers['set-cookie'];
	});

	afterAll(async () => {
		await seed();
	});

	describe('/api/users/login', () => {
		test('should log in successfully', async () => {
			user = await agent
				.post('/api/users/login')
				.send(userCredential)
				.expect(200);
			loggedInUser = user.headers['set-cookie'];
			user = user.body;
			expect(user).toHaveProperty('firstName', 'Natalie');
			expect(user).toHaveProperty('lastName', 'Morales');
			expect(user).toHaveProperty(
				'email',
				'nmorales@gmail.com'
			);
		});
		test('should prevent logged in user to log in', async () => {
			user = await agent
				.post('/api/users/login')
				.set('cookie', loggedInUser)
				.send(userCredential)
				.expect(301);
			expect(user.text).toBe(loggedInAlready);
		});
		test('should return an error for wrong credential', async () => {
			wrongEmail = await agent
				.post('/api/users/login')
				.send({
					email: 'tom@gmail.com',
					password: 'happy'
				})
				.expect(401);
			wrongPassword = await agent
				.post('/api/users/login')
				.send({
					email: 'nmorales@gmail.com',
					password: 'happi'
				})
				.expect(401);
			missingPassword = await agent
				.post('/api/users/login')
				.send({
					email: 'nmorales@gmail.com',
					password: ''
				})
				.expect(401);
			expect(wrongEmail.body).toBe(wrongCredential);
			expect(wrongPassword.body).toBe(wrongCredential);
			expect(missingPassword.body).toBe(missingCredential);
		});
	});

	describe('/api/users/logout', () => {
		test('should successfully logout', async () => {
			user = await agent
				.post('/api/users/logout')
				.set('cookie', loggedInUser)
				.expect(200);
			const { firstName, lastName, email } = user.body;
			expect(firstName).toBe('Natalie');
			expect(lastName).toBe('Morales');
			expect(email).toBe('nmorales@gmail.com');
		});
		test('should block unauthorized user', async () => {
			errorUser = await agent
				.post('/api/users/logout')
				.expect(401);
			user = await agent
				.post('/api/users/logout')
				.set('cookie', loggedInUser)
				.expect(401);
			expect(errorUser.text).toBe(loginToProceed);
			expect(user.text).toBe(loginToProceed);
		});
	});

	describe('/api/users/signup', () => {
		test('should successfully sign up', async () => {
			user = await agent
				.post('/api/users/signup')
				.send({
					firstName: 'new',
					lastName: 'user',
					email: 'newuser@gmail.com',
					password: 'boom'
				})
				.expect(201);
			newUser = user.headers['set-cookie'];
			const { email } = user.body;
			expect(email).toBe('newuser@gmail.com');
		});
		test('should prevent logged in user to sign up', async () => {
			errorUser = await agent
				.post('/api/users/signup')
				.set('cookie', newUser)
				.send({
					firstName: 'new',
					lastName: 'user',
					email: 'newuser@gmail.com',
					password: 'boom'
				})
				.expect(301);
			expect(errorUser.text).toBe(loggedInAlready);
		});
		test('should prevent duplicate email', async () => {
			errorUser = await agent
				.post('/api/users/signup')
				.send({
					firstName: 'existing',
					lastName: 'user',
					email: 'newuser@gmail.com',
					password: 'boo'
				})
				.expect(409);
			expect(errorUser.text).toBe('Email already exist');
		});
		test('should return an error if any field empty', async () => {
			try {
				errorUser = await agent
					.post('/api/users/signup')
					.send({
						firstName: 'new',
						lastName: 'user',
						password: 'boo'
					})
					.expect(400);
				expect(errorUser.text).toBe(missingField);
			} catch (error) {
				expect(error).toMatch('error');
			}
		});
	});

	describe('/api/users', () => {
		test('should block unauthorized user', async () => {
			errorUser = await agent.get('/api/users').expect(401);
			expect(errorUser.text).toBe(loginToProceed);
		});
		test('should return current user info', async () => {
			user = await agent
				.get('/api/users')
				.set('cookie', newUser)
				.expect(200);
			const { firstName, lastName, email } = user.body;
			expect(firstName).toBe('new');
			expect(lastName).toBe('user');
			expect(email).toBe('newuser@gmail.com');
		});
		test('should return all user for admins', async () => {
			const admin = await agent
				.get('/api/users')
				.set('cookie', adminUser)
				.expect(200);
			expect(admin.body.length).toBeGreaterThanOrEqual(10);
		});
		test('should update the user logged in', async () => {
			user = await agent
				.put('/api/users')
				.set('cookie', newUser)
				.send({
					firstName: 'old',
					email: 'olduser@gmail.com'
				})
				.expect(200);
			const { firstName, lastName, email } = user.body;
			expect(firstName).toBe('old');
			expect(lastName).toBe('user');
			expect(email).toBe('olduser@gmail.com');
		});
		test('should update the user as an admin', async () => {
			await agent
				.put('/api/users')
				.set('cookie', adminUser)
				.send({
					id: 11,
					firstName: 'awesome',
					email: 'awesomeuser@gmail.com'
				})
				.expect(200);
			user = await agent
				.get('/api/users')
				.set('cookie', newUser)
				.expect(200);
			const { firstName, lastName, email } = user.body;
			expect(firstName).toBe('awesome');
			expect(lastName).toBe('user');
			expect(email).toBe('awesomeuser@gmail.com');
		});
		test('should block unauthorized user', async () => {
			errorUser = await agent
				.delete('/api/users')
				.expect(401);
			expect(errorUser.text).toBe(loginToProceed);
		});
		test('should allow user to delete their profile', async () => {
			await agent
				.delete('/api/users')
				.set('cookie', newUser)
				.expect(200);
			user = await agent
				.get('/api/users')
				.set('cookie', newUser)
				.expect(401);
		});
		test('should allow admin to delete their profile', async () => {
			user = await agent
				.post('/api/users/login')
				.send({
					email: 'nmorales@gmail.com',
					password: 'happy'
				})
				.expect(200);
			await agent
				.delete('/api/users')
				.set('cookie', adminUser)
				.send({ id: user.body.id })
				.expect(200);
		});
	});
});
