const express = require('express')
const router = express.Router()

const {
        GetLetter,
        CreateLetter,
        UpdateLetter,
        DeleteLetter} = require('../controllers/coverLetter')

router.route('/').post(CreateLetter)
router.route('/:id').get(GetLetter).delete(DeleteLetter).patch(UpdateLetter)

module.exports = router
