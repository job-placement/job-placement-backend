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
		describe('Validating Unauthorize User', () => {
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

		describe.skip('GET /api/users', () => {
			test('should return a user', async () => {
				expect(response.body).toHaveLength(1);
			});
		});
	});

	// describe('Jobs API', () => {});

	describe('Skills API', () => {
		describe('GET /api/skills', () => {
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
