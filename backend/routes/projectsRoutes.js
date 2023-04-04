const express = require('express')
const router = express.Router()
const { createProject, getProjects } = require('../controllers/projectController')


const {protect} = require('../middleware/authMiddleware')

router.post('/new-project', protect, createProject)
router.get('/', protect, getProjects)


module.exports = router