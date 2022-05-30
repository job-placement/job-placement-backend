const { db, DataTypes, Model } = require('../db');

class User extends Model {};

User.init({
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
	experience: DataTypes.INTEGER
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { User };
