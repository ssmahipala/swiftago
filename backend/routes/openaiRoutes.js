const express = require('express')
const router = express.Router()
const { generateText } = require('../controllers/openai')


const {protect} = require('../middleware/authMiddleware')

router.get('/generate-text', protect, generateText)



module.exports = router