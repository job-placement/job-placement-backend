const { Job, Skill, JobSkill } = require('../models');

const getJobs = async (request, response) => {
	try {
		const jobs = await Job.findAll({ include: Skill });
		response.json(jobs);
	} catch (error) {
		console.error(error);
	}
};

const getJobById = async (request, response) => {
	try {
		const { jobId } = request.params;
		const job = await Job.findByPk(jobId, {
			include: Skill
		});
		if (!job) return response.status(404).send('Not Found');
		response.json(job);
	} catch (error) {
		console.error(error);
	}
};

const createJob = async (request, response) => {
	try {
		const {
			company,
			logo,
			featured,
			position,
			role,
			level,
			postedAt,
			contract,
			location,
			skills
		} = request.body;
		const newJob = await Job.create({
			company,
			logo,
			new: request.body.new,
			featured,
			position,
			role,
			level,
			postedAt,
			contract,
			location,
			UserId: request.user.id
		});
		if (skills) {
			const allSkills = await Skill.findAll();
			const jobSkills = allSkills
				.filter(skill => skills.includes(skill.name))
				.map(skill => ({
					JobId: newJob.id,
					SkillId: skill.id
				}));
			await JobSkill.bulkCreate(jobSkills);
		}
		const result = await Job.findByPk(newJob.id, {
			include: Skill
		});
		response.json(result);
	} catch (error) {
		console.error(error);
	}
};

const editJob = async (request, response) => {
	try {
		const { id, admin } = request.user;
		const { jobId } = request.params;
		let updateJob = await Job.findByPk(jobId);
		if (updateJob.UserId !== id && !admin) {
			return response
				.status(403)
				.send('Only the creator or admin can modify');
		}
		await updateJob.update(request.body);
		if (request.body.skills) {
			await JobSkill.destroy({ where: { JobId: jobId } });
			const allSkills = await Skill.findAll();
			const jobSkills = allSkills
				.filter(skill => skills.includes(skill.name))
				.map(skill => ({
					JobId: updateJob.id,
					SkillId: skill.id
				}));
			await JobSkill.bulkCreate(jobSkills);
		}
		updateJob = await Job.findByPk(jobId, {
			include: Skill
		});
		response.json(updateJob);
	} catch (error) {
		console.error(error);
	}
};

const deleteJob = async (request, response) => {
	try {
		const { jobId } = request.params;
		const { id, admin } = request.user;
		const deletedJob = await Job.findByPk(jobId);
		if (deletedJob.UserId !== id && !admin) {
			return response.send('Only the creater can delete');
		}
		await deletedJob.destroy();
		response.json(deletedJob);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getJobs,
	createJob,
	editJob,
	deleteJob,
	getJobById
};
