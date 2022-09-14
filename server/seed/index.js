const path = require('path');
const fs = require('fs').promises;
const { Client } = require('pg');

const pkg = require('../../package.json');
const { Job, Skill, User, Application, JobSkill, db } = require('../../api/v1/models');

// creates a database called placement
const createDB = async () => {
	try {
		// creaing a client with connection information
		const client = await new Client({
			user: "postgres",
			password: "postgres",
			database: "postgres",
			host: "localhost",
			port: 5432
		});

		// open the connection for the client
		await client.connect();

		// create a database called the name of the project (placement)
		await client.query(`CREATE DATABASE ${pkg.name}`, async (error, res) => {
			try {
				if (error) {
					console.log(error.message);
				} else {
					console.log(`Database ${pkg.name} created`);
				}
				// close the connection for the client
				await client.end();

				// seed function will populate the database
				await seed();
			} catch(error) {
				console.log(error.message);
			}
		});
	} catch(error) {
		console.log(error.message);
	}
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
		const skillPromises = skills.map(skill => Skill.create(skill));
		const userPromises = users.map(user => User.create(user));

		// make sure all the promise are resolved
		const skill = await Promise.all(skillPromises);
		const user = await Promise.all(userPromises);

		// User table must be created before the Job table
		const jobPromises = jobs.map(job => Job.create(job));
		const job = await Promise.all(jobPromises);

		// Job, Skill, and User table must be created before these table
		const applicationPromises = applications.map(application => Application.create(application));
		const jobSkillPromises = jobSkills.map(jobSkill => JobSkill.create(jobSkill));

		const application = await Promise.all(applicationPromises);
		const jobSkill = await Promise.all(jobSkillPromises);

		console.log(`Data have been successfully added to your database`);
	} catch(error) {
    console.error(error);
	}
}

if (module === require.main) {
	createDB();
}

module.exports = { seed };