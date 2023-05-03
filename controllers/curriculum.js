const Curriculum = require('../models/Curriculum')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
// GetCV,
// CreateCV,
// UpdateCV,
// DeleteCV

const CreateCV = async (req,res) => {
    console.log('clg line 10 controllers',req.file)
    const cv = Curriculum.create(req.file)
    res.send(StatusCodes.OK)
}

module.exports = {
    CreateCV
}