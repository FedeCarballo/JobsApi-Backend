const mongoose = require('mongoose')

const CurriculumSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [false, 'please provide user']
    }
})

module.exports = mongoose.model('Curriculum', CurriculumSchema)
