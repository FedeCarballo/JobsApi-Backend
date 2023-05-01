require('dotenv').config()
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const register = async (req,res) => {
    const user = await User.create({...req.body})
    const token = user.CreateJWT()
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token })
}
const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    //Validacion de autenticacion, es decir que existe el usuario
    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    //Validacion de contraseña, es decir que existe el usuario con esa contraseña 
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.CreateJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

module.exports = {
    register,
    login
}