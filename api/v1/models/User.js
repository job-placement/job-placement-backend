const { db, DataTypes, Model } = require('../../../server/db');

class User extends Model {};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	image: DataTypes.STRING,
	resume: DataTypes.STRING,
	bio: DataTypes.STRING,
	experience: DataTypes.INTEGER,
	admin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { User };
