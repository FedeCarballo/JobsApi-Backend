const multer = require('multer')
const {extname} = require('path')

const multerUpload = multer({
    storage: multer.diskStorage({
        destination:'./uploads',
        filename: (req,file,cb) => {
            const extension = extname(file.originalname)
            const name = file.originalname.split(extension)[0]
            cb(null, `${name}-${Date.now()}${extension}`)
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