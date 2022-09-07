const { jobs } = require('../server/seed/Job.json');
const { skills } = require('../server/seed/Skill.json');
const { users } = require('../server/seed/User.json');
const { applications } = require('../server/seed/Application.json');
const { jobSkills } = require('../server/seed/JobSkill.json');

describe('All json file should have data', () => {
  describe('Job.json', () => {
    test('should have a length of 10', async () => {
      expect(jobs).toHaveLength(10);
    });
    test('should have the following property', () => {
      expect(jobs[0]).toHaveProperty('company');
      expect(jobs[0]).toHaveProperty('logo');
      expect(jobs[0]).toHaveProperty('new');
      expect(jobs[0]).toHaveProperty('featured');
      expect(jobs[0]).toHaveProperty('position');
      expect(jobs[0]).toHaveProperty('role');
      expect(jobs[0]).toHaveProperty('level');
      expect(jobs[0]).toHaveProperty('contract');
      expect(jobs[0]).toHaveProperty('location');
      expect(jobs[0]).toHaveProperty('UserId');
    });
    test('should have the correct data for the following property', () => {
      expect(jobs[0]).toHaveProperty('company', 'Photosnap');
      expect(jobs[0]).toHaveProperty('new', true);
      expect(jobs[0]).toHaveProperty('featured', true);
      expect(jobs[0]).toHaveProperty('role', 'Frontend');
      expect(jobs[0]).toHaveProperty('level', 'Senior');
      expect(jobs[0]).toHaveProperty('UserId', 5);
      expect(jobs[1].company).toBe('Manage');
      expect(jobs[1].new).toBe(true);
      expect(jobs[2].company).toBe('Account');
      expect(jobs[4].position).toBe('Software Engineer');
      expect(jobs[4].role).toBe('Fullstack');
      expect(jobs[7].level).toBe('Junior');
      expect(jobs[8].location).toBe('Worldwide');
      expect(jobs[9].featured).toBe(false);
      expect(jobs[9].company).toBe('The Air Filter Company');
    });
  });

  describe('Skill.json', () => {
    test('should have a length of 18', async () => {
      expect(skills).toHaveLength(18);
    });
    test('should have the following property', () => {
      expect(skills[0]).toHaveProperty('name');
    });
    test('should have the correct data for the following property', () => {
      expect(skills[1]).toHaveProperty('name', 'JavaScript');
      expect(skills[2]).toHaveProperty('name', 'Python');
      expect(skills[0].name).toBe('Java');
      expect(skills[4].name).toBe('Golang');
      expect(skills[9].name).toBe('SQL');
      expect(skills[12].name).toBe('HTML');
      expect(skills[15].name).toBe('React');
    });
  });

  describe('User.json', () => {
    test('should have a length of 10', async () => {
      expect(users).toHaveLength(10);
    });
    test('should have the following property', () => {
      expect(users[0]).toHaveProperty('firstName');
      expect(users[0]).toHaveProperty('lastName');
      expect(users[0]).toHaveProperty('email');
      expect(users[0]).toHaveProperty('password');
      expect(users[0]).toHaveProperty('image');
      expect(users[0]).toHaveProperty('resume');
      expect(users[0]).toHaveProperty('bio');
      expect(users[0]).toHaveProperty('experience');
    });
    test('should have the correct data for the following property', () => {
      expect(users[0]).toHaveProperty('firstName', 'Natalie');
      expect(users[0]).toHaveProperty('lastName', 'Morales');
      expect(users[0]).toHaveProperty('email', 'nmorales@gmail.com');
      expect(users[1]).toHaveProperty('bio', 'HappyPerson');
      expect(users[1]).toHaveProperty('experience', 1);
      expect(users[3].firstName).toBe('Michelle');
      expect(users[5].email).toBe('benaffleck@gmail.com');
      expect(users[8].image).toBe('HappyFace');
      expect(users[8].resume).toBe('HappyWorker');
      expect(users[9].firstName).toBe('Tyler');
      expect(users[9].lastName).toBe('Perry');
      expect(users[9].email).toBe('tylerperry@gmail.com');
      expect(users[9].password).toBe('happy');
      expect(users[9].experience).toBe(1);
    });
  });

  describe('Application.json', () => {
    test('should have a length of 18', async () => {
      expect(applications).toHaveLength(17);
    });
    test('should have the following property', () => {
      expect(applications[0]).toHaveProperty('JobId');
      expect(applications[0]).toHaveProperty('UserId');
    });
    test('should have the correct data for the following property', () => {
      expect(applications[1]).toHaveProperty('JobId', 2);
      expect(applications[2]).toHaveProperty('JobId', 5);
      expect(applications[2]).toHaveProperty('UserId', 1);
      expect(applications[0].JobId).toBe(1);
      expect(applications[4].JobId).toBe(4);
      expect(applications[9].JobId).toBe(3);
      expect(applications[12].JobId).toBe(3);
      expect(applications[15].JobId).toBe(5);
      expect(applications[1].UserId).toBe(1);
      expect(applications[5].UserId).toBe(3);
      expect(applications[10].UserId).toBe(7);
      expect(applications[14].UserId).toBe(10);
      expect(applications[17].UserId).toBe(10);
    });
  });

  describe('JobSkill.json', () => {
    test('should have a length of 19', async () => {
      expect(jobSkills).toHaveLength(19);
    });
    test('should have the following property', () => {
      expect(jobSkills[0]).toHaveProperty('JobId');
      expect(jobSkills[0]).toHaveProperty('SkillId');
    });
    test('should have the correct data for the following property', () => {
      expect(jobSkills[1]).toHaveProperty('JobId', 1);
      expect(jobSkills[2]).toHaveProperty('JobId', 1);
      expect(jobSkills[2]).toHaveProperty('SkillId', 2);
      expect(jobSkills[0].JobId).toBe(1);
      expect(jobSkills[4].JobId).toBe(2);
      expect(jobSkills[9].JobId).toBe(5);
      expect(jobSkills[12].JobId).toBe(7);
      expect(jobSkills[15].JobId).toBe(9);
      expect(jobSkills[1].SkillId).toBe(14);
      expect(jobSkills[5].SkillId).toBe(2);
      expect(jobSkills[10].SkillId).toBe(8);
      expect(jobSkills[14].SkillId).toBe(2);
      expect(jobSkills[17].SkillId).toBe(2);
    });
  });
});
