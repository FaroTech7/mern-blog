import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('MongoDB connected successfully')

        await mongoose.connection.db.admin().ping()

        console.log('MongoDB ping successful')

    } catch (error) {
        console.error('MongoDB error:', error)
    }
}

export default connectDB