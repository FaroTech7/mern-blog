import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send('MERN Blog API is running')
})

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})