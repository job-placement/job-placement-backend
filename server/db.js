const { Sequelize, DataTypes, Model } = require('sequelize');
const { Client } = require('pg');

const pkg = require('../package.json');

// creates a database called placement
const createDB = async (connectDB) => {
  // creaing a client with connection information
  const client = new Client({
    user: "postgres",
    password: "postgres",
    database: "postgres",
    host: "localhost",
    port: 5432
  });

  // open the connection for the client
  client.connect();

  // create a database called the name of the project (placement)
  client.query(`CREATE DATABASE ${pkg.name}`, (error, res) => {
    if (error) {
        console.error('\033[31m', error.message, '\033[0m');
    } else {
        console.log('\033[32m', `Database ${pkg.name} created`, '\033[0m');
    }

    // close the connection for the client
    client.end();

    // invoke the callback to create an instance in sequelize 
    connectDB();
  });
};

// creates an instance of database called by the apps name
const connectToDatabase = () => {
  // create the database instance of the database
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
};

createDB(connectToDatabase);
