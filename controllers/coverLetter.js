const Letter = require('../models/CoverLetter')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const CreateLetter = async (req,res) =>{
    req.body.createdBy = req.user.userId
    console.log(req.body.createdBy);
    const letter = await Letter.create(req.body)
    res.status(StatusCodes.CREATED).json({letter})
}
const GetLetter = async(req,res) => {
    const {user:{userId},params:{id:LetterId}} = req
    const letter = await Letter.findOne({
        _id : LetterId, 
        createdBy:userId 
    })
    if(!letter){
        throw new NotFoundError(`Not job with ${JobId}`)
    }
    res.status(StatusCodes.OK).json({letter})
}

const UpdateLetter = async (req,res) => {

}

const DeleteLetter = async (req,res) =>{

}

module.exports = {
    CreateLetter, 
    GetLetter,
    UpdateLetter,
    DeleteLetter
}
