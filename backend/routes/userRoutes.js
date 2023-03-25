const express = require('express')
const router = express.Router()
const { registerUser, loginUser, welcome } = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/welcome', protect, welcome)

module.exports = router