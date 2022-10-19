const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe('API routes', () => {
	beforeAll(async () => {
		await seed();
	});

	afterAll(async () => {
		await seed();
	});

	describe('Users API', () => {
		let getUser, updateUser, deleteUser, loginUser, newUser;

		describe.skip('Validating Unauthorize User', () => {
			beforeAll(async () => {
				getUser = await agent.get('/api/users');
				updateUser = await agent.put('/api/users').send({
					firstName: 'Bobby',
					email: 'bob@gmail.com'
				});
				deleteUser = await agent.delete('/api/users');
				logoutUser = await agent.post('/api/users/logout');
				const login = await agent
					.post('/api/users/login')
					.send({
						email: 'nmorales@gmail.com',
						password: 'happy'
					});
				loginUser = await agent
					.post('/api/users/login')
					.set('cookie', login.headers['set-cookie'])
					.send({
						email: 'nmorales@gmail.com',
						password: 'happy'
					});
				newUser = await agent
					.post('/api/users/signup')
					.set('cookie', login.headers['set-cookie'])
					.send({
						firstName: 'new',
						lastName: 'user',
						email: 'newUser@gmail.com',
						password: 'boom'
					});
			});
			test('should have status 401', () => {
				expect(getUser.status).toBe(401);
				expect(updateUser.status).toBe(401);
				expect(deleteUser.status).toBe(401);
				expect(logoutUser.status).toBe(401);
			});
			test('should have the following message', () => {
				const message = 'Please log in to proceed';
				expect(getUser.text).toBe(message);
				expect(updateUser.text).toBe(message);
				expect(deleteUser.text).toBe(message);
				expect(logoutUser.text).toBe(message);
			});
			test('should have status 301', async () => {
				expect(loginUser.status).toBe(301);
				expect(newUser.status).toBe(301);
			});
			test('should have the following message', () => {
				const message = 'You are already logged in';
				expect(loginUser.text).toBe(message);
				expect(newUser.text).toBe(message);
			});
		});

		const loggedInMessage = 'You are already logged in';
		const loginMessage = 'Please log in to proceed';
		let loggedInUser, loggedOutUser, adminUser, randomUser;
		const userCredential = {
			email: 'nmorales@gmail.com',
			password: 'happy'
		};

		beforeAll(async () => {
			login = await agent.post('/api/users/login').send({
				email: 'brucewillis@aol.com',
				password: 'happy'
			});
			adminUser = login.headers['set-cookie'];
		});

		describe('/api/users/login', () => {
			test('should log in successfully', async () => {
				const login = await agent
					.post('/api/users/login')
					.send(userCredential)
					.expect(200);
				loggedInUser = login.headers['set-cookie'];
				const user = login.body;
				expect(user).toHaveProperty('firstName', 'Natalie');
				expect(user).toHaveProperty('lastName', 'Morales');
				expect(user).toHaveProperty(
					'email',
					'nmorales@gmail.com'
				);
			});
			test('should prevent logged in user to log in', async () => {
				const user = await agent
					.post('/api/users/login')
					.set('cookie', loggedInUser)
					.send(userCredential)
					.expect(301);
				expect(user.text).toBe(loggedInMessage);
			});
			test('should return an error for wrong credential', async () => {
				const message = 'Incorrect Email or Password!';
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
				expect(wrongEmail.body).toBe(message);
				expect(wrongPassword.body).toBe(message);
			});
		});

		describe('/api/users/logout', () => {
			test('should successfully logout', async () => {
				loggedOutUser = await agent
					.post('/api/users/logout')
					.set('cookie', loggedInUser)
					.expect(200);
				const { firstName, lastName, email } =
					loggedOutUser.body;
				expect(firstName).toBe('Natalie');
				expect(lastName).toBe('Morales');
				expect(email).toBe('nmorales@gmail.com');
			});
			test('should block unauthorized user', async () => {
				randomUser = await agent
					.post('/api/users/logout')
					.expect(401);
				loggedOutUser = await agent
					.post('/api/users/logout')
					.set('cookie', loggedInUser)
					.expect(401);
				expect(randomUser.text).toBe(loginMessage);
				expect(loggedOutUser.text).toBe(loginMessage);
			});
		});

		describe('/api/users/signup', () => {
			test('should successfully sign up', async () => {
				const newUser = await agent
					.post('/api/users/signup')
					.send({
						firstName: 'new',
						lastName: 'user',
						email: 'newUser@gmail.com',
						password: 'boom'
					})
					.expect(200);
				loggedInUser = newUser.headers['set-cookie'];
				const { email } = newUser.body;
				expect(email).toBe('newUser@gmail.com');
			});
			test('should prevent logged in user to sign up', async () => {
				newUser = await agent
					.post('/api/users/signup')
					.set('cookie', loggedInUser)
					.send({
						firstName: 'new',
						lastName: 'user',
						email: 'newUser@gmail.com',
						password: 'boom'
					})
					.expect(301);
				expect(newUser.text).toBe(loggedInMessage);
			});
			test('should prevent duplicate email', async () => {
				const user = await agent
					.post('/api/users/signup')
					.send({
						firstName: 'existing',
						lastName: 'user',
						email: 'newUser@gmail.com',
						password: 'boo'
					})
					.expect(409);
				expect(user.text).toBe('Email already exist');
			});
		});

		describe.skip('/api/users', () => {
			test('should return a user', async () => {
				expect(response.body).toHaveLength(1);
			});
		});
	});

	// describe('Jobs API', () => {});

	describe.skip('Skills API', () => {
		describe('/api/skills', () => {
			let skills;
			beforeAll(async () => {
				const allSkills = await agent.get('/api/skills');
				skills = allSkills.body.map(skill => skill.name);
			});
			test('should have a lenth of 18 skills', () => {
				expect(skills).toHaveLength(18);
			});
			test('should contain the following skills', () => {
				expect(skills).toContain('Java');
				expect(skills).toContain('Golang');
			});
		});
	});
});
