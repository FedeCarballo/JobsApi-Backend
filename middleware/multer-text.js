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
    limits:{
        fieldSize: 1000000,
    }
})

module.exports = multerUpload