require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide name'],
        minlength: 3,
        maxlength: 15,
    },
    email: {
        type: String,
        required :[true, 'Please provide Email'],
        minlength: 3,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Por favor ingrese un Email valido'
        ],
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Please provide Password'],
        minlength: 6,
    },
})

//Realizamos el encriptado de la contraseña para no enviarlo en formato de string
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.CreateJWT = function(){
    return jwt.sign({userId: this._id, name: this.name},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_TIMELINE
    } )
}
userSchema.methods.comparePassword = async function (canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model('User', userSchema)