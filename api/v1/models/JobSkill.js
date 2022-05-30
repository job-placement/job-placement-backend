const { db, DataTypes, Model } = require('../../../server/db');
const { Job } = require('./Job.js');
const { Skill } = require('./Skill.js');

class JobSkill extends Model {};

JobSkill.init({
	JobId: {
		type: DataTypes.INTEGER,
		references: {
			model: Job,
			key: 'id'
		}
	},
	SkillId: {
		type: DataTypes.INTEGER,
		references: {
			model: Skill,
			key: 'id'
		}
	}
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { JobSkill };
