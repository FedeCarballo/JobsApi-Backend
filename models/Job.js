const mongoose = require('mongoose')

const JobsScheema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'please provide company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true, 'please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['resume sended','inverview', 'pending', 'declined'],
        default: 'pending'
    },
    //Asociamos el trabajo con el usuario (controller jobs --> linea 14)
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job',JobsScheema)