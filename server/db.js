const { Sequelize, DataTypes, Model } = require('sequelize');

const pkg = require('../package.json');

const pg = require('pg')

let db
if (process.env.DATABASE_URL) {
    pg.defaults.ssl = true
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
} else {
    db = new Sequelize(`postgres://postgres:postgres@localhost:5432/${pkg.name}`, { logging: false})}

// creates an instance of database called by the apps name
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://postgres:postgres@localhost:5432/${pkg.name}`,
//   {
//     logging: false
//   }
// );

// Test if the instance is properly connected
// const testDatabaseConnection = async () => {
//   try {
//     const connection = await db.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error(`Unable to connect to the database: ${error}`);
//   }
// }
// testDatabaseConnection();

module.exports = { db, DataTypes, Model };
