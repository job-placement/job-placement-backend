const { db, DataTypes, Model } = require('../db');

class Tool extends Model {};

Tool.init({
  name: DataTypes.STRING
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { Tool };
