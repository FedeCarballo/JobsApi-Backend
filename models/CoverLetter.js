const mongoose = require('mongoose')

const PresentationSchema = new mongoose.Schema({
    description:{
        type: String,
        default: ''
    },createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
})

module.exports = mongoose.model('Letter', PresentationSchema)