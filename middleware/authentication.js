const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req,res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Error en la autenticación')
    }
    //Hacemos el split y tomamos el segundo valor ya que es el que nos interesa
    const token = authHeader.split(' ')[1]
    const token2 = authHeader.split()[1]
    //Tenemos 2 formas de traer token por lo tanto verificamos ambas formas para poder validar el usuario
    if(token || token2){
        try {
            const payload = jwt.verify(token || token2, process.env.JWT_SECRET)
            req.user = {userId:payload.userId, name:payload.name}
            next()
        } catch (error) {
            throw new UnauthenticatedError('Error en la autenticación')
        }
    }
    else{
        throw new UnauthenticatedError('Error en la autenticación')
    }
}

module.exports = auth