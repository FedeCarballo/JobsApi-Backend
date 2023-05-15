const express = require('express')
const router = express.Router()
const multerMiddleware = require('../middleware/multer')
const {
    CreateCV,
    GetCV
} = require('../controllers/curriculum')

router.post('/',multerMiddleware.single('file'),CreateCV)
router.route('/pdf/:fileId').get(GetCV).delete().patch()

module.exports = router