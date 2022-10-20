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
		const loggedInAlready = 'You are already logged in';
		const loginToProceed = 'Please log in to proceed';
		const wrongCredential = 'Incorrect Email or Password!';
		const missingField = 'All fields must be filled out';
		const missingCredential = 'Missing credentials';
		let loggedInUser, adminUser, randomUser, newUser, user;
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
				expect(missingPassword.body).toBe(
					missingCredential
				);
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
				randomUser = await agent
					.post('/api/users/logout')
					.expect(401);
				user = await agent
					.post('/api/users/logout')
					.set('cookie', loggedInUser)
					.expect(401);
				expect(randomUser.text).toBe(loginToProceed);
				expect(user.text).toBe(loginToProceed);
			});
		});

		describe('/api/users/signup', () => {
			test('should successfully sign up', async () => {
				newUser = await agent
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
				expect(newUser.text).toBe(loggedInAlready);
			});
			test('should prevent duplicate email', async () => {
				user = await agent
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
			test('should return an error if any field empty', async () => {
				try {
					user = await agent
						.post('/api/users/signup')
						.send({
							firstName: 'new',
							lastName: 'user',
							password: 'boo'
						})
						.expect(400);
					expect(user.text).toBe(missingField);
				} catch (error) {
					expect(error).toMatch('error');
				}
			});
		});

		describe.skip('/api/users', () => {
			test('should return a user', async () => {
				expect(response.body).toHaveLength(1);
			});
		});
	});

	describe('Jobs API', () => {
		describe.skip('/api/jobs', () => {
			test('should', () => {});
		});
		describe.skip('/api/jobs/:jobId', () => {
			test('should', () => {});
		});
	});

	describe('Skills API', () => {
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
				expect(skills).toContain('React');
				expect(skills).toContain('HTML');
			});
		});
	});
});
