const express = require('express')
const router = express.Router()

const {login, register, ReqPassword,SendPassword, logout} = require('../controllers/auth')

router.post('/register',register)
router.post('/logout', logout)
router.post('/login',login)
router.post('/forgot-password',ReqPassword)
router.post('/forgot-password/:token',SendPassword)
module.exports = router