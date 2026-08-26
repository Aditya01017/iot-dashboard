const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const assetRoutes = require('./routes/assetRoutes')

dotenv.config()

const app = express()
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/assets', assetRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'IoT Dashboard API is running' })
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

const PORT = process.env.PORT || 5000

const requiredEnvironment = ['MONGO_URI', 'JWT_SECRET']
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key])

if (missingEnvironment.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvironment.join(', ')}`)
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
