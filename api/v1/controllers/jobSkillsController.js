const { Job } = require("../models/index");
const { JobSkill } = require("../models/JobSkill");
const { Skill } = require("../models/index");

const getJobSkills = async (request, response, next) => {
  try {
    const jobSkills = await JobSkill.findAll({});
    response.json(jobSkills);
  } catch (e) {
    console.log(e);
  }
};

const createJobSkills = async (request, response, next) => {
  try {
    const createSkill = await JobSkill.create({
      // JobId: newJob.id,
      // SkillId: newSkills[i].id,
    });
    await createSkill.save();
    response.json(createSkill);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getJobSkills,
  createJobSkills,
};
