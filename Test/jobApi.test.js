const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe('Jobs API', () => {
	beforeAll(async () => {
		await seed();
	});

	afterAll(async () => {
		await seed();
	});
	describe.skip('Jobs API', () => {
		describe('/api/jobs', () => {
			test('should be true', () => {
				expect(true).toBeTruthy();
			});
		});

		describe('/api/jobs/:jobId', () => {
			test('should', () => {});
		});
	});
});
