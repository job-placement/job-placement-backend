// const { db, DataTypes, Model } = require('../../../server/db');
const { db } = require('../../../server/db');
const { Sequelize, DataTypes, Model } = require('sequelize');


class Job extends Model {};

Job.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company: DataTypes.STRING,
  logo: DataTypes.STRING,
  new: DataTypes.BOOLEAN,
  featured: DataTypes.BOOLEAN,
  position: DataTypes.STRING,
  role: DataTypes.STRING,
  level: DataTypes.STRING,
  postedAt: DataTypes.STRING,
  contract: DataTypes.STRING,
  location: DataTypes.STRING,
  UserId: DataTypes.INTEGER
}, {
	sequelize: db,
	timestamps: true,
  // createAt: true
});

module.exports = { Job };
