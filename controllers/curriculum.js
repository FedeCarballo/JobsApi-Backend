const Curriculum = require('../models/Curriculum')
const { Readable } = require('stream');
const mime = require('mime-types');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const {GridFSBucket, ObjectID } = require('mongodb')
const mongoose = require('mongoose')
// GetCV, x
// CreateCV, x 
// UpdateCV,
// DeleteCV 


const GetCV = async (req,res) => {
    const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'pdfs'
    })
    const fileId = new ObjectID(req.params.fileId);
    const find = await Curriculum.findOne({
      file: fileId
    })
    if(!find){
      throw new NotFoundError(`No se encontro el Curriculum solicitado`)
    }
    else{
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

const DeleteCurriculum = async(req,res) => {
  const fileId = new ObjectID(req.params.fileId);
  const curriculum = await Curriculum.findOneAndDelete({
    file: fileId
  })
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'pdfs'
})

if (!curriculum){
  throw new NotFoundError(`No se encontro curriculum con el ID: ${fileId}`)
}
console.log(curriculum);
  bucket.delete(fileId, err =>{
    if(err) {
      return res.status(500).json({message: "Error al borrar el archivo PDF, por favor vuelva a intentarlo"})
    }
    res.status(StatusCodes.OK).json({message: "PDF borrado exitosamente"})
  })
}

const UpdateCurriculum = async (req,res) => {

}
module.exports = {
    CreateCV,
    GetCV,
    DeleteCurriculum,
    UpdateCurriculum
}