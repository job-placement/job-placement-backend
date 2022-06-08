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

const getJobById = async (request, response, next) => {
  try {
    const job = await Job.findAll({
      where: {
        id: request.params.jobId
      },
      include: Skill
    })
    response.json(job)
  } catch (e) {
    console.log(e)
  }
}

const getJobByUser = async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.userId)
    const job = await Job.findAll({
      where: {
        id: request.params.jobId
      },
      include: Skill
    })
    response.json({user: user, job: job})
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
    
          create new Skill instance and include to new Job instance
          const amidala = await User.create({ username: 'p4dm3', points: 1000 });
          const queen = await Profile.create({ name: 'Queen' });
          await amidala.addProfile(queen, { through: { selfGranted: false } });
          const result = await User.findOne({
            where: { username: 'p4dm3' },
            include: Profile
          });
          console.log(result);
    */
    
    const user = await User.findByPk(request.params.userId)
    
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
    }

    const newJob = await Job.create(newJobData)
    await user.addJob(newJob)

    const result = await User.findAll( {
      where: {
        id: request.params.userId
      },
      include: Job
    })

    console.log(result)

    response.json(newJob)

  } catch (e) {
    console.log(e)
  }
}

const editJob = async (request, response, next) => {
  try {
    
    const user = await User.findByPK(request.params.userId)
    const job = await Job.findByPK(request.params.jobId) //request.params.jobId ??

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
    const jobToDelete = await Job.destroy({ WHERE: { id: request.body.jobId }})

  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getJobs,
  getJobByUser,
  createJob,
  editJob,
  deleteJob,
  getJobById
}