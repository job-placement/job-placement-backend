const { db, DataTypes, Model } = require('../db');

class Job extends Model {};

Job.init({
  company: DataTypes.STRING,
  logo: DataTypes.STRING,
  new: DataTypes.BOOLEAN,
  featured: DataTypes.BOOLEAN,
  position: DataTypes.STRING,
  role: DataTypes.STRING,
  level: DataTypes.STRING,
  postedAt: DataTypes.STRING,
  contract: DataTypes.STRING,
  location: DataTypes.STRING
}, {
	sequelize: db,
	timestamps: false,
});

module.exports = { Job };
