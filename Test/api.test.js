const app = require('../server/app');
const agent = require('supertest')(app);
// const session = require('supertest-session')
const { seed } = require('../server/seed');

describe('API routes', () => {
	beforeAll(async () => {
		await seed();
	});
	afterAll(async () => {
		await seed();
	});

	describe('Users API', async () => {
		test('should have a length of 10', async () => {
			const response = await agent
				.get('/api/users')
				.expect(200);
			expect(response).toHaveLength(10);
		});
	});

	describe('Jobs API', () => {});

	describe('Skills API', () => {});
});

describe('User session', () => {
	describe('Authentication API', () => {});
});
