const request = require('supertest');

const { seed } = require('../server/seed');
const app = require('../server/app');

const agent = request(app);

describe.skip('Skills API', () => {
	describe('/api/skills', () => {
		let skills;
		beforeAll(async () => {
			await seed();
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
			expect(skills).toContain('Ruby');
		});
	});
});
