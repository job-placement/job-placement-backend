const { Skill } = require('../models/index')
const { Job } = require('../models/index')



const getSkills = async (request, response, next) => {
  try {
    const skills = await Skill.findAll({
      // include: Job
    })
    response.json(skills)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getSkills
}