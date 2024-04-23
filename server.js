import express from "express";
import dotenv from 'dotenv'
import connectDB from "./db.js";
import morgan from 'morgan'
import authRoute from "./routes/authRoute.js";
import usersRoute from './routes/usersRouter.js'
import hotelsRoute from './routes/hotelsRoute.js'
import roomsRoute from './routes/roomsRoute.js'
import cookieParser from "cookie-parser";
import cors from "cors"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import { swaggerOptions } from "./helpers/swagger.config.js";


dotenv.config()

const PORT = process.env.PORT || 3500

const app = express();
// const connectDB = async () => {

//     try {
//         await mongoose.connect(process.env.MONGODB)
//         console.log('DB connected')
//     } catch (error) {
//         throw error
//     }
// }

// mongoose.connection.on('disconnected', () => {
//     console.log('mongodb disconnected')
// })



//middleware


const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use(cors({
    // credentials: true,
    origin:"http://localhost:5173"}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)


//errorhandling middleware
app.use((err,req,res,next) => {
    // console.log('middleware')
    // next()
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(PORT, () => {
    connectDB()
    console.log(`server is running on PORT ${PORT}`)
})