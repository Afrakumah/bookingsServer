import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectDB = async () => {
try {
    const connected = await mongoose.connect(process.env.MONGODB)
    if(connected) {
        console.log('mongoDB connected successfully')
    }
} catch (error) {
    throw error
}
}

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected')
})

export default connectDB
