const express = require('express')
const router = express.Router()

const {login, register, ReqPassword} = require('../controllers/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/forgot-password',ReqPassword)
module.exports = router