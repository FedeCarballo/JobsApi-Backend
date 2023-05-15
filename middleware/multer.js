const multer = require('multer')
const {extname} = require('path')

const storage = multer.memoryStorage()

const multerUpload = multer({
    storage: storage,
    fileFilter: (req,file,cb) =>{
        if(file.mimetype == 'application/pdf') cb(null,true)
        else cb(new Error(`only .pdf alowed`))
    },
    limits:{
        fieldSize: 1000000,
    }
})

module.exports = multerUpload