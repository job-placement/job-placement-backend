const { Job } = require('../models/index')
const { JobSkill } = require('../models/JobSkill')
const { Skill } = require('../models/index')



const getJobSkills = async (request, response, next) => {
  try {
    const jobSkills = await JobSkill.findAll({
    })
    response.json(jobSkills)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getJobSkills
}