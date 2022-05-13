const { Job } = require('./Job');
const { Language } = require('./Language');
const { Skill } = require('./Skill');
const { Tool } = require('./Tool');
const { User } = require('./User');
const { db } = require('../db');

// creates a mode called Apply with JobId, UserId
Job.belongsToMany(User, { through: 'Apply' });
User.belongsToMany(Job, { through: 'Apply' });

// creates a mode called JobTool with JobId, SkillId
Job.belongsToMany(Skill, { through: 'JobSkill' });
Skill.belongsToMany(Job, { through: 'JobSkill' });

// Use this these relation if we use Language and Tool model
// creates a mode called JobLang with JobId, LanguageId
// Job.belongsToMany(Language, { through: 'JobLang' });
// Language.belongsToMany(Job, { through: 'JobLang' });

// creates a mode called JobTool with JobId, ToolId
// Job.belongsToMany(Tool, { through: 'JobTool' });
// Tool.belongsToMany(Job, { through: 'JobTool' });

module.exports = {
	Job,
	Language,
	Skill,
	Tool,
	User,
	db
};
