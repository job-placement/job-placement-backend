const app = require('../server/app');
const agent = require('supertest')(app);
const session = require('supertest-session');
const { seed } = require('../server/seed');

describe('API routes', () => {
  beforeAll(async () => {
    await seed();
  });

  afterAll(async () => {
    await seed();
  });

  describe('Users API', async () => {
    const response = await agent.get('/api/users')
  });

  describe('Jobs API', () => {

  });

  describe('Skills API', () => {

  });
});

describe('User session', () => {
  describe('Authentication API', () => {

  });
});
