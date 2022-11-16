const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe('Jobs API', () => {
	let jobs, job, jobError, loggedInUser, adminUser, user;
	const notFound = 'Not Found';
	const loginToProceed = 'Please log in to proceed';
	const createrOnly =
		'Only the creator or admin can modify';
	const userCredential = {
		email: 'nmorales@gmail.com',
		password: 'happy'
	};

	beforeAll(async () => {
		await seed();
		user = await agent
			.post('/api/users/login')
			.send(userCredential);
		const admin = await agent
			.post('/api/users/login')
			.send({
				email: 'brucewillis@aol.com',
				password: 'happy'
			});
		loggedInUser = user.headers['set-cookie'];
		adminUser = admin.headers['set-cookie'];
	});

	afterAll(async () => {
		await seed();
	});

	describe('/api/jobs', () => {
		// GET route
		test('should return all jobs', async () => {
			jobs = await agent.get('/api/jobs').expect(200);
			expect(jobs.body.length).toEqual(10);
		});

		// POST route
		test('should block unauthorized user', async () => {
			jobError = await agent.post('/api/jobs').expect(401);
			expect(jobError.text).toBe(loginToProceed);
		});
		test('should create a job and be added to the DB', async () => {
			job = await agent
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
			expect(Array.isArray(jobs.body)).toBeTruthy();
			expect(jobs.body.length).toBeGreaterThanOrEqual(10);
		});
	});

	describe('/api/jobs/:jobId', () => {
		// GET route
		test('should retrieve the job by id', async () => {
			const id = job.body.id;
			job = await agent.get(`/api/jobs/${id}`).expect(200);
			const { company, logo, role, UserId } = job.body;
			expect(company).toBe('Apple');
			expect(logo).toBe('A bitten apple');
			expect(role).toBe('Fullstack');
			expect(UserId).toBe(user.body.id);
		});

		// PUT route
		test('should block unauthorized user', async () => {
			const id = job.body.id;
			jobError = await agent
				.put(`/api/jobs/${id}`)
				.expect(401);
			expect(jobError.text).toBe(loginToProceed);
		});
		test('should only update job by owner', async () => {
			jobError = await agent
				.put('/api/jobs/2')
				.set('cookie', loggedInUser)
				.send({
					company: 'Pear',
					logo: 'A pear with a leaf'
				})
				.expect(403);
			expect(jobError.text).toBe(createrOnly);
		});
		test('should update the selected job', async () => {
			const id = job.body.id;
			job = await agent
				.put(`/api/jobs/${id}`)
				.set('cookie', loggedInUser)
				.send({
					company: 'Pear',
					logo: 'A pear with a leaf'
				})
				.expect(200);
			const { company, logo, role } = job.body;
			expect(company).toBe('Pear');
			expect(logo).toBe('A pear with a leaf');
			expect(role).toBe('Fullstack');
		});
		test('should allow admin to update', async () => {
			const id = job.body.id;
			job = await agent
				.put(`/api/jobs/${id}`)
				.set('cookie', adminUser)
				.send({
					logo: 'A bitten Pear'
				})
				.expect(200);
			const { company, logo, role } = job.body;
			expect(company).toBe('Pear');
			expect(logo).toBe('A bitten Pear');
			expect(role).toBe('Fullstack');
		});

		// DELETE route
		test('should block unauthorized user', async () => {
			const id = job.body.id;
			jobError = await agent
				.delete(`/api/jobs/${id}`)
				.expect(401);
			expect(jobError.text).toBe(loginToProceed);
		});
		test('should only delete job by owner', async () => {
			jobError = await agent
				.put('/api/jobs/2')
				.set('cookie', loggedInUser)
				.expect(403);
			expect(jobError.text).toBe(createrOnly);
		});
		test('should delete the selected job', async () => {
			const id = job.body.id;
			job = await agent
				.delete(`/api/jobs/${id}`)
				.set('cookie', loggedInUser)
				.expect(200);
			job = await agent.get(`/api/jobs/${id}`).expect(404);
			expect(job.text).toBe(notFound);
		});
		test('should allow admin to delete', async () => {
			job = await agent
				.delete('/api/jobs/4')
				.set('cookie', adminUser)
				.expect(200);
			job = await agent.get('/api/jobs/4').expect(404);
			expect(job.text).toBe(notFound);
		});
	});
});
