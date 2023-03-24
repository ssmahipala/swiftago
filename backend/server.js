const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).send('Swiftago - Crafting user stories for you...Effortlessly')
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server Initialized on PORT ${PORT}`))