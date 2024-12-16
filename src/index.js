// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js";


dotenv.config({
    path: '.env'
})

connectDB()














/*

import express from "express"
const app = express()
// use IIFE for "CONNECTING TO DB"
;( async () => {
    try {
        // connectng to DB through mongoose
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // if our "express" app is not able to talk to DB or not
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

