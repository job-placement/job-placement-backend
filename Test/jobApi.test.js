const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe('Jobs API', () => {
	let jobs, loggedInUser, adminUser, randomUser;
	const loginToProceed = 'Please log in to proceed';
	beforeAll(async () => {
		await seed();
		const user = await agent.post('/api/users/login').send({
			email: 'nmorales@gmail.com',
			password: 'happy'
		});
		const admin = await agent
			.post('/api/users/login')
			.send({
				email: 'brucewillis@aol.com',
				password: 'happy'
			});
		loggedInUser = user.headers['set-cookie'];
		adminUser = admin.headers['set-cookie'];
	});

	// afterAll(async () => {
	// 	await seed();
	// });

	describe('/api/jobs', () => {
		test('should return all jobs', async () => {
			jobs = await agent.get('/api/jobs').expect(200);
			expect(jobs.body.length).toBeGreaterThanOrEqual(10);
		});
		test('should block unauthorized user', async () => {
			randomUser = await agent
				.post('/api/jobs')
				.expect(401);
			expect(randomUser.text).toBe(loginToProceed);
		});
		test('should create a job and add it to the DB', async () => {
			await agent
				.post('/api/jobs')
				.set('cookie', loggedInUser)
				.send({
					company: 'Apple',
					logo: 'A bitten apple',
					new: true,
					featured: true,
					position: 'Fullstack Developer',
					role: 'Fullstack',
					level: 'Midweight',
					postedAt: '1d ago',
					contract: 'Part Time',
					location: 'Remote',
					skills: ['React', 'HTML', 'CSS']
				})
				.expect(200);
			jobs = await agent.get('/api/jobs').expect(200);
			expect(jobs.body.length).toBe(11);
			const job = jobs.body.find(
				job => job.company === 'Apple'
			);
			expect(job.company).toBe('Apple');
			expect(job.logo).toBe('A bitten apple');
			expect(job.role).toBe('Fullstack');
			expect(job.UserId).toBe(1);
		});
	});

	describe('/api/jobs/:jobId', () => {
		test('should', () => {});
	});
});
