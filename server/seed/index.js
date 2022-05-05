const path = require('path');
const fs = require('fs').promises;

const { Job, Language, Skill, Tool, User, db } = require('../models');

const seed = async () => {
	await db.sync({force: true});
	// await db.drop();

	const jobPath = path.join(__dirname, 'Job.json');
	// const languagePath = path.join(__dirname, 'Language.json');
	const skillPath = path.join(__dirname, 'Skill.json');
	// const toolPath = path.join(__dirname, 'Tool.json');
	const userPath = path.join(__dirname, 'User.json');

	const jobBuffer = await fs.readFile(jobPath);
	// const languageBuffer = await fs.readFile(languagePath);
	const skillBuffer = await fs.readFile(skillPath);
	// const toolBuffer = await fs.readFile(toolPath);
	const userBuffer = await fs.readFile(userPath);

	const { jobs } = JSON.parse(String(jobBuffer));
	// const { languages } = JSON.parse(String(languageBuffer));
	const { skills } = JSON.parse(String(skillBuffer));
	// const { tools } = JSON.parse(String(toolBuffer));
	const { users } = JSON.parse(String(userBuffer));

	const jobPromises = jobs.map(job => Job.create(job));
	// const languagePromises = languages.map(language => Language.create(language));
	const skillPromises = skills.map(skill => Skill.create(skill));
	// const toolPromises = tools.map(tool => Tool.create(tool));
	const userPromises = users.map(user => User.create(user));
	
	await Promise.all(jobPromises);
	// await Promise.all(languagePromises);
	await Promise.all(skillPromises);
	// await Promise.all(toolPromises);
	await Promise.all(userPromises);

	console.log('Data have been successfully added to your database');
}

seed();
