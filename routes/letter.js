const express = require('express')
const router = express.Router()

const {
        GetLetter,
        CreateLetter,
        UpdateLetter,
        DeleteLetter} = require('../controllers/coverLetter')

router.route('/:id').post(CreateLetter).get(GetLetter).delete(DeleteLetter).patch(UpdateLetter)

module.exports = router
