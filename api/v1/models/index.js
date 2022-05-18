const { Job } = require('./Job');
const { Skill } = require('./Skill');
const { User } = require('./User');
const { Application } = require('./Application');
const { JobSkill } = require('./JobSkill');
const { db } = require('../db');

// creates a mode called Apply with JobId, UserId
Job.belongsToMany(User, { through: Application });
User.belongsToMany(Job, { through: Application });

// creates a mode called JobTool with JobId, SkillId
Job.belongsToMany(Skill, { through: JobSkill });
Skill.belongsToMany(Job, { through: JobSkill });

module.exports = {
	Job,
	Skill,
	User,
	Application,
	JobSkill,
	db
};
