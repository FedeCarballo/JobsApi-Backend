
const { createReadStream } = require('fs');
const Curriculum = require('../models/Curriculum')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
// GetCV,
// CreateCV,
// UpdateCV,
// DeleteCV

const CreateCV = async (req,res) => {
    const { title, description } = req.body;
    console.log(req.file);
    const buffer = req.file.buffer;

    const readablePdfStream = createReadStream(buffer);
    const cv = new Curriculum({
        title,
        description,
        file : readablePdfStream
    })
    await cv.save()
    res.send(StatusCodes.OK)
}

module.exports = {
    CreateCV
}