const { Sequelize, DataTypes, Model } = require('sequelize');

const pkg = require('../package.json');

// creates an instance of database called by the apps name
const db = new Sequelize(
  process.env.DATABASE_DEV_URL || `postgres://postgres:postgres@localhost:5432/${pkg.name}`,
  {
    logging: false
  }
);

// Test in the instance is properly connected and working
const testDatabaseConnection = async () => {
  try {
    await db.authenticate();
    console.log('\033[32m', 'Connection has been established successfully.', '\033[0m');
  } catch (error) {
    console.error('\033[31m', `Unable to connect to the database: ${error}`, '\033[0m');
  }
}
testDatabaseConnection();

module.exports = { db, DataTypes, Model };
