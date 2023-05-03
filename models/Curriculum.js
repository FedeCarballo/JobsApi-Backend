const mongoose = require('mongoose')

const CurriculumSchema = new mongoose.Schema({
    description:{
        type: String,
        default: ''
    },createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [false, 'please provide user']
    }
})

module.exports = mongoose.model('Curriculum', CurriculumSchema)
