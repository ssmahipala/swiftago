const express = require('express')
const router = express.Router()
const { registerUser, loginUser, welcome, updateUser } = require('../controllers/userController')
const { getChatGPTResponse } = require('../chatgpt')


const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/welcome', protect, welcome)
router.patch('/update', protect, updateUser)
router.post('/gpt', getChatGPTResponse)

module.exports = router