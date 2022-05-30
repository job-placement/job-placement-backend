const {
  Job,
  Skill,
  User,
  db } = require('../server/models');
const { Sequelize } = require('sequelize');

describe.only('Database, Sequelize and Models', () => {
  describe('db', () => {
    test('should be an instance of Sequelize', () => {
      expect(db).toBeInstanceOf(Sequelize);
    });
  });

  describe('Job Model', () => {
    beforeAll(async () => {
      await Promise.all([
        Job.create({
          company: 'Disney',
          logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Walt_Disney_Pictures_2011_logo.svg/1200px-Walt_Disney_Pictures_2011_logo.svg.png',
          new: true,
          featured: false,
          position: 'Software Engineer',
          role: 'Front-End',
          level: 'Junior',
          postedAt: '2mo ago',
          contract: 'Full-time',
          location: 'USA',
          UserId: 5
        }),
        Job.create({
          company: 'The Home Depot',
          logo: 'https://i0.wp.com/logotaglines.com/wp-content/uploads/2020/02/Home-Depot-Logo.jpg?fit=900%2C900&ssl=1',
          new: true,
          featured: false,
          position: 'Software Engineer',
          role: 'Back-End',
          level: 'Senior',
          postedAt: '2mo ago',
          contract: 'Part-time',
          location: 'USA',
          UserId: 5
        })
      ]);
    });
    test('should have a total of 12 jobs', async () => {
      const jobs = await Job.findAll({ raw: true });

      expect(jobs).toHaveLength(12);
    });
    test('should have 2 new job', async () => {
        const disney = await Job.findOne({ where: { company: 'Disney' }});
        const homeDepot = await Job.findOne({
          where: { company: 'The Home Depot' }});

        expect(disney.company).toBe('Disney');
        expect(disney.new).toBe(true);
        expect(disney.position).toBe('Software Engineer');
        expect(disney.role).toBe('Front-End');
        expect(disney.contract).toBe('Full-time');

        expect(homeDepot.company).toBe('The Home Depot');
        expect(homeDepot.featured).toBe(false);
        expect(homeDepot.role).toBe('Back-End');
        expect(homeDepot.level).toBe('Senior');
        expect(homeDepot.contract).toBe('Part-time');
    });
    test('should have 7 jobs created by user with id 5', async () => {
      const jobCreated = await Job.findAll({ raw: true, where: { UserId: 5 }});
      expect(jobCreated).toHaveLength(7);
    });
  });

  describe('Skill Model', () => {
    beforeAll(async () => {
      await Promise.all([
        Skill.create({ name: 'Vue' }),
        Skill.create({ name: 'SASS' }),
        Skill.create({ name: 'LESS' })
      ]);
    });
    test('should have a length of 21', async () => {
      const skill = await Skill.findAll({ raw: true });

      expect(skill).toHaveLength(21);
      expect(skill).not.toHaveLength(18);
    });
    test('should have the correct value', async () => {
      const skill = await Skill.findAll({ raw: true, attributes: ['name'] });
      const listOfSkills = [
        { name: 'Java' },
        { name: 'Python' },
        { name: 'Golang' },
        { name: 'PHP' },
        { name: 'React' }
      ];

      expect(skill).toEqual(expect.arrayContaining(listOfSkills));
    });
  });

  describe('User Model', () => {
    test('should have 10 users', async () => {
      const users = await User.findAll({ raw: true });
      expect(users).toHaveLength(10);
    });
    test('should have the correct value', async () => {
      const user = await User.findOne({ where: { firstName: 'Morgan' }});

      expect(user.firstName).toBe('Morgan');
      expect(user.lastName).toBe('Freeman');
      expect(user.password).toBe('happy');
      expect(user.bio).toBe('HappyPerson');
      expect(user.experience).toBe(1);
    })
  });

  describe('Application Model', () => {
    test('should have 8 users that applied to jobs', async () => {
      const users = await User.findAll({ raw: true, include: [{ model: Job }]});
      const appliedUser = users.filter(user => !user['Jobs.company']);

      expect(appliedUser).toHaveLength(8);
    });
  });

  describe('JobSkill Model', () => {
    beforeAll(async () => {
      const disney = await Job.findOne({
        where: { company: 'Disney' }});
      const homeDepot = await Job.findOne({
        where: { company: 'The Home Depot' }});
      const skills = await Skill.findAll();
      const swift = skills.find(skill => skill.name === 'Swift');
      const dart = skills.find(skill => skill.name === 'Dart');
      const golang = skills.find(skill => skill.name === 'Golang');
      const angular = skills.find(skill => skill.name === 'Angular');
      const cPlus = skills.find(skill => skill.name === 'C++');

      await disney.addSkills(swift);
      await disney.addSkills(dart);
      await disney.addSkills(golang);
      await homeDepot.addSkills(golang);
      await homeDepot.addSkills(angular);
      await homeDepot.addSkills(cPlus);
    });
    test('should have skills added to Disney and The Home Depot', async () => {
      const disney = await Job.findOne({
        where: { company: 'Disney' }, include: [{ model: Skill}]});
      const homeDepot = await Job.findOne({
        where: { company: 'The Home Depot' }, include: [{ model: Skill}]});
      const disneySkills = disney.Skills.map(skill => skill.name);
      const homeDepotSkills = homeDepot.Skills.map(skill => skill.name);

      expect(disney.Skills).toHaveLength(3);
      expect(homeDepot.Skills).toHaveLength(3);
      
      expect(disneySkills).toContain('Swift');
      expect(disneySkills).toContain('Golang');
      expect(homeDepotSkills).toContain('Angular');
      expect(homeDepotSkills).toContain('C++');
    });
    test('should have 3 skills for Photosnap job', async () => {
      const photosnap = await Job.findOne( { where: { company: 'Photosnap' }});
      const photoSkills = await photosnap.getSkills();
      const listOfSkills = photoSkills.map(skill => skill.name);

      expect(listOfSkills).toHaveLength(3);

      expect(listOfSkills).toContain('JavaScript');
      expect(listOfSkills).toContain('HTML');
      expect(listOfSkills).toContain('CSS');
    });
  });

  describe('jobs are created by a user', () => {
    test('should have 7 jobs created by user with id 5', async () => {
      const recruiter = await User.findAll({
        raw:true, where: { id: 5 }, include: Job });

      expect(recruiter).toHaveLength(7);
    });
    test('should have 5 jobs created by user with id 9', async () => {
      const recruiter = await User.findAll({
        raw:true, where: { id: 9 }, include: Job });

      expect(recruiter).toHaveLength(5);
    });
  });
});
