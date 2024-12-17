// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';


dotenv.config({
    path: '.env'
})

//connecting to DB
connectDB()
.then(() => {
    // check if our "express" app is able to talk to DB or not
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error
    })
    // start listening through express app
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

/*

import express from "express"
const app = express()
// use IIFE for "CONNECTING TO DB"
;( async () => {
    try {
        // connectng to DB through mongoose
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // if our "express" app is able to talk to DB or not
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })
        // start listening through express app
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error);
        throw error
    }
})()

*/

