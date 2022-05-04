const { Sequelize, DataTypes, Model } = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_DEV_URL || 'postgres://postgres:postgres@localhost:5432/placement',
  {
    logging: false
  }
);

const testDatabaseConnection = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testDatabaseConnection();

module.exports = { db, DataTypes, Model };
