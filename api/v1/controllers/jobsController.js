/*

CRUD actions

*/

const { Job } = require('../models/index')
const { User } = require('../models/index')
const { Skill } = require('../models/index')



const getJobs = async (request, response, next) => {
  try {
    const jobs = await Job.findAll({
      include: Skill
    })
    response.json(jobs)
  } catch (e) {
    console.log(e)
  }
}

const createJob = async (request, response, next) => {
  try {
    /* 
    TODO: create global currentUser
          determine if PK is available in POSTMAN
          if not then find user by JWT?
    */
    // commented out for testing purpose
    //const user = await User.findByPK(request.body.userId)

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
      // commented out for testing purpose
      // UserId: user.id
      UserId: request.body.UserId
    }

    await Job.create(newJobData)
    response.send("A new Job has been created")

  } catch (e) {
    console.log(e)
  }
}

const editJob = async (request, response, next) => {
  try {
    
    const user = await User.findByPK(request.body.userId)
    const job = await Job.findByPK(request.body.jobId) //request.params.jobId ??

    job.set({
      company: request.body.company,
      logo: request.body.company,
      new: request.body.new,
      featued: request.body.featured,
      position: request.body.position,
      role: request.body.role,
      level: request.body.level,
      postedAt: request.body.postedAt,
      contract: request.body.contract,
      location: request.body.location,
    })

    await job.save()

  } catch (e) {
    console.log(e)
  }

}

const deleteJob = async (request, response, next) => {
  try {
    const jobToDelete = await Job.find({ WHERE: { id: request.body.jobId }})
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getJobs,
  createJob,
  editJob,
  deleteJob
}