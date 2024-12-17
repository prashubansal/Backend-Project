import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// to configure cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// to configure express for setting limit of json data(through form)
app.use(express.json({limit: "16kb"}))
// to configure express for data coming from URL
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// to configure express for storing buffer data in my own server in public folder => ki ye public assets hai koi access karlo
app.use(express.static("public"))

//to configure cookieParser
app.use(cookieParser())

export { app }