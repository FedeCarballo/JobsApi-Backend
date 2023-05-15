const Curriculum = require('../models/Curriculum')
const { Readable } = require('stream');
const mime = require('mime-types');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const {GridFSBucket, ObjectID } = require('mongodb')
const mongoose = require('mongoose')
// GetCV,
// CreateCV,
// UpdateCV,
// DeleteCV


const GetCV = async (req,res) => {
    const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'pdfs'
    })
    const fileId = new ObjectID(req.params.fileId);
    if (!fileId || fileId.length === 0) {
        return res.status(404).json({ message: 'No se encontró el archivo PDF' });
      }
    else{
        console.log(fileId);
        const downloadStream = bucket.openDownloadStream(fileId);
        downloadStream.on('file', file => {
            const contentType = mime.contentType(file.filename);
            res.set('Content-Type', contentType);
          });
          downloadStream.pipe(res);
    }
}
const CreateCV = async (req,res) => {
    const { title, description } = req.body
    const buffer = req.file.buffer 
    const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'pdfs'
    })
    console.log(bucket);
    const uploadStream = bucket.openUploadStream(req.file.originalname);
  const readablePdfStream = new Readable();
  readablePdfStream.push(buffer);
  readablePdfStream.push(null);
  readablePdfStream.pipe(uploadStream);
  uploadStream.on('finish', async () => {
    const pdf = new Curriculum({
      title,
      description,
      file: uploadStream.id
    });

    await pdf.save();
    res.send('Archivo PDF cargado con éxito')})
}

module.exports = {
    CreateCV,
    GetCV
}