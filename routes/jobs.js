const express = require('express')
const router = express.Router()

const {getAllJobs,
        GetJob,
        CreateJob,
        UpdateJob,
        DeleteJob} = require('../controllers/jobs')

router.route('/').post(CreateJob).get(getAllJobs)
router.route('/:id').get(GetJob).delete(DeleteJob).patch(UpdateJob)

module.exports = router
