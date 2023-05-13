const multer = require('multer')
const {extname} = require('path')
const {
    GridFsStorage
  } = require("multer-gridfs-storage");


const multerUpload = multer({
    storage: multer.diskStorage({
        destination:'./uploads',
        filename: (req,file,cb) => {
            cb(null, String(Date.now()), + ' - ' + file.originalname)
        }
    }),
    fileFilter: (req,file,cb) =>{
        if(file.mimetype == 'application/pdf') cb(null,true)
        else cb(new Error(`only .pdf alowed`))
    },
    limits:{
        fieldSize: 1000000,
    }
})

module.exports = multerUpload