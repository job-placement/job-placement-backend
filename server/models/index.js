const { Job } = require('./Job');
const { Skill } = require('./Skill');
const { User } = require('./User');
const { db } = require('../db');

// creates a mode called Apply with JobId, UserId
Job.belongsToMany(User, { through: 'Apply' });
User.belongsToMany(Job, { through: 'Apply' });

// creates a mode called JobTool with JobId, SkillId
Job.belongsToMany(Skill, { through: 'JobSkill' });
Skill.belongsToMany(Job, { through: 'JobSkill' });

module.exports = {
	Job,
	Skill,
	User,
	db
};
