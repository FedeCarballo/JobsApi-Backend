const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const GetJob = async (req,res) => {
    const {user:{userId},params:{id:JobId}} = req
    const job = await Job.findOne({
        _id : JobId, 
        createdBy:userId 
    })
    if(!job){
        throw new NotFoundError(`Not job with ${JobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const CreateJob = async (req,res) => {
   // Aca asociamos el job al usuario
    req.body.createdBy = req.user.userId
  
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const UpdateJob = async (req,res) => {
    const {
        body: {company, position},
        user:{ userId },
        params:{ id:JobId }} 
        = req

    if(company === '' || position=== ''){
        throw new BadRequestError('Company or position fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate({_id:JobId, createdBy:userId}, req.body,{new:true, runValidators: true})
    if(!job){
        throw new NotFoundError(`Not job with ${JobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const DeleteJob = async (req,res) => {
    const {
        user:{ userId },
        params:{ id:JobId }} 
        = req
    const job = await Job.findByIdAndRemove({
        _id: JobId,
        createdBy:userId,
    })
    if(!job){
        throw new NotFoundError(`Not job with ${JobId}`)
    }
    res.status(StatusCodes.OK).send()
}
module.exports = {
    getAllJobs,
    GetJob,
    CreateJob,
    UpdateJob,
    DeleteJob
}