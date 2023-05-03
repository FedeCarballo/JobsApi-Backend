const express = require('express')
const router = express.Router()
const multerMiddleware = require('../middleware/multer')
const {
    CreateCV,
} = require('../controllers/curriculum')

router.post('/',multerMiddleware.single('file'),CreateCV)
router.route('/:id').get().delete().patch()

module.exports = router