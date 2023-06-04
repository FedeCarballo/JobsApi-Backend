const Letter = require('../models/CoverLetter')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const CreateLetter = async (req,res) =>{
    req.body.createdBy = req.user.userId
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
        throw new NotFoundError(`No se encontro carta de presentacion con el id: ${LetterId}, por favor verifique los datos ingresados`)
    }
    res.status(StatusCodes.OK).json({letter})
}

const UpdateLetter = async (req,res) => {
    const {
        body: { description },
        user:{ userId },
        params:{ id:LetterId }} 
        = req
    if(description=== '' || !description){
        throw new BadRequestError('Por favor rellene los datos solicitados')
    }
    const LetterUpdated = await Letter.findByIdAndUpdate({_id:LetterId, createdBy:userId}, req.body,{new:true, runValidators: true})
    if(!LetterUpdated){
        throw new NotFoundError(`No se encontro la carta de presentacion con el id: ${LetterId}`)
    }
    res.status(StatusCodes.OK).json({LetterUpdated})
}

const DeleteLetter = async (req,res) =>{
    const {
        user:{ userId },
        params:{ id:LetterId }} 
        = req
    const job = await Letter.findByIdAndRemove({
        _id: LetterId,
        createdBy:userId,
    })
    if(!job){
        throw new NotFoundError(`No se encontro carta de presentacion con el id: ${LetterId}`)
    }
    res.status(StatusCodes.OK).json({message: 'Carta de presentacion borrada exitosamente'})
}

module.exports = {
    CreateLetter, 
    GetLetter,
    UpdateLetter,
    DeleteLetter
}
