const mongoose = require('mongoose')

const CurriculumSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Por favor ingrese usuario']
    }
})

module.exports = mongoose.model('Curriculum', CurriculumSchema)
