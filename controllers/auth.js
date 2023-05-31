require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
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
const ReqPassword = async (req,res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if(!user){
        throw new UnauthenticatedError('No se encontro un correo registrado')
    }
    const token = user.CreateJWT()
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    })
    const mailOptions = {
        from: 'Web Jobs v0.1',
        to: email,
        subject: 'Restablecimiento de contraseña',
        text: 'Haz clic en el siguiente enlace para restablecer tu contraseña: ' +
          `http://localhost:3000/api/v1/auth/forgot-password/${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Ocurrió un error al enviar el correo electrónico.' });
            }
        });
    res.status(StatusCodes.OK).json({ message: 'Se ha enviado un correo electrónico para restablecer la contraseña.' })
}
const SendPassword = async (req,res) => {
    const {token} = req.params
    const {password} = req.body
    try {
        // verificamos que exista el user
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //hasheamos la password para enviarlo nuevamente
        const salt = await bcrypt.genSalt(10)
        const PasswordHashed = await bcrypt.hash(password, salt)
        req.user = {userId:payload.userId}
        if(!PasswordHashed || PasswordHashed == ''){
            throw new BadRequestError('Por favor rellenar los datos requeridos')
        }
        const user = await User.findByIdAndUpdate({_id:req.user.userId},{password: PasswordHashed},{new:true, runValidators: true})
        res.status(StatusCodes.OK).json({user})
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    register,
    login,
    ReqPassword,
    SendPassword
}