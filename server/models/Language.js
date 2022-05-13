const { db, DataTypes, Model } = require('../db');

class Language extends Model {};

Language.init({
  name: DataTypes.STRING
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { Language };
