/*

CRUD actions

*/

const { Job } = require('../models/index')
const { User } = require('../models/index')



const getJobs = async (request, response, next) => {
  try {
    const jobs = await Job.findAll()
    response.json(jobs)
  } catch (e) {
    console.log(e)
  }
}

const createJob = async (request, response, next) => {
  try {
    /* 
    TODO: create global currentUser
    */
    const user = await User.findByPK(request.userId)

    const newJobData = {
      company: request.body.company,
      logo: request.body.company,
      new: true,
      featued: false,
      position: request.body.position,
      role: request.body.role,
      level: request.body.level,
      postedAt: request.body.postedAt,
      contract: request.body.contract,
      location: request.body.location,
      UserId: user.id
    }

    await Job.create(newJobData)

  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getJobs,
  createJob
}