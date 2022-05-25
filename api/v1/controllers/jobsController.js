/*

CRUD actions

*/

const { Job } = require('../models/index')


const getJobs = async (request, response, next) => {
  try {
    const jobs = await Job.findAll()
    response.json(jobs)
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getJobs
}