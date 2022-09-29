const {
	db,
	DataTypes,
	Model
} = require('../../../server/db');
const { Job } = require('./Job.js');
const { User } = require('./User.js');

class Application extends Model {}

Application.init(
	{
		JobId: {
			type: DataTypes.INTEGER,
			references: {
				model: Job,
				key: 'id'
			}
		},
		UserId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id'
			}
		}
	},
	{
		sequelize: db,
		timestamps: false
	}
);

module.exports = { Application };
