const { Job } = require('./Job');
const { Skill } = require('./Skill');
const { User } = require('./User');
const { Application } = require('./Application');
const { JobSkill } = require('./JobSkill');
const { db } = require('../../../server/db');

// Application Model show which Users who applied to the Jobs
Job.belongsToMany(User, { through: Application });
User.belongsToMany(Job, { through: Application });

// User can create jobs, Job Model will have a column "UserId"
User.hasMany(Job, { onDelete: 'cascade', hooks: true });
Job.belongsTo(User);

// JobSkill Model show which Skills are in the jobs
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
