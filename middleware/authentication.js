const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req,res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid')
    }
    //Hacemos el split y tomamos el segundo valor ya que es el que nos interesa
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = auth