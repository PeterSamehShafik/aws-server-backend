import express from 'express'
// import connectDB from './DB/connection.js';
import * as indexRouter from './modules/indexRouter.js'
import { globalErrorHandling } from './middlewares/errorHandle.js';
import cors from 'cors'


const appRouter = (app) => {

    //Constants
    const baseURL = process.env.BASEURL


    //Convert buffer data
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({}));

    //API Routing
    app.use(`${baseURL}/aws/s3`, indexRouter.awsRouter)


    //In-valid routing handling
    app.use('*', (req, res, next) => {
        // res.status(404).json({ message: "404 Page not found", details: "In-valid Routing or method" })
        return next(Error("404 Page not found In-valid Routing or method", { cause: 404 }))
    })


    //global error handling
    app.use(globalErrorHandling)



}

export default appRouter