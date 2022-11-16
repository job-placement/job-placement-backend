const { Skill } = require('../models/index');

const getSkills = async (request, response) => {
	try {
		const skills = await Skill.findAll();
		response.json(skills);
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getSkills
};
