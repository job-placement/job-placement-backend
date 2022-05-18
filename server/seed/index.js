const path = require('path');
const fs = require('fs').promises;
const { Client } = require('pg');

const pkg = require('../../package.json');
const { Job, Skill, User, Application, JobSkill, db } = require('../../api/v1/models');

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

    // seed function will populate the database
    seed();
  });
};

// populate the table in the database
const seed = async () => {
	try {
		// drops all the table and then creates it again with no data
		await db.sync({force: true});

		// locate and store the path to the json file
		const jobPath = path.join(__dirname, 'Job.json');
		const skillPath = path.join(__dirname, 'Skill.json');
		const userPath = path.join(__dirname, 'User.json');
		const applicationPath = path.join(__dirname, 'Application.json');
		const jobSkillPath = path.join(__dirname, 'JobSkill.json');

		// store the data as a buffer from the json file
		const jobBuffer = await fs.readFile(jobPath);
		const skillBuffer = await fs.readFile(skillPath);
		const userBuffer = await fs.readFile(userPath);
		const applicationBuffer = await fs.readFile(applicationPath);
		const jobSkillBuffer = await fs.readFile(jobSkillPath);

		// convert the buffer into a string to parse it to json
		const { jobs } = JSON.parse(String(jobBuffer));
		const { skills } = JSON.parse(String(skillBuffer));
		const { users } = JSON.parse(String(userBuffer));
		const { applications } = JSON.parse(String(applicationBuffer));
		const { jobSkills } = JSON.parse(String(jobSkillBuffer));

		// loop through each json object and insert data into the table
		const jobPromises = jobs.map(job => Job.create(job));
		const skillPromises = skills.map(skill => Skill.create(skill));
		const userPromises = users.map(user => User.create(user));

		// make sure all the promise are resolved
		await Promise.all(jobPromises);
		await Promise.all(skillPromises);
		await Promise.all(userPromises);

		// Job, Skill, and User table must be created before these table
		const applicationPromises = applications.map(application => Application.create(application));
		const jobSkillPromises = jobSkills.map(jobSkill => JobSkill.create(jobSkill));
	
		await Promise.all(applicationPromises);
		await Promise.all(jobSkillPromises);

		console.log('\033[32m', `Data have been successfully added to your database`, '\033[0m');
	} catch(error) {
    console.error('\033[31m', error, '\033[0m');
	}
}

createDB();
