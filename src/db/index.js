import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//Assignments
// read "process" in NodeJS and "exit()" method in process
// console.log(connectionInstance) and read it. 

const connectDB = async () => {
    try {
        // we are getting response after connecting to DB in this variable
        // "connectionInstance.connection.host" => to check if we are connecting to the right DB or not
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1)
    }
}

export default connectDB;