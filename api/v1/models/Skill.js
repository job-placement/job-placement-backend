const { db, DataTypes, Model } = require('../db');

class Skill extends Model {};

Skill.init({
  name: DataTypes.STRING
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { Skill };
