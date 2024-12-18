// local server pe toh file aa chuki hai
// ab server se aap mujhe local path doge
// I will upload the file on cloudinary
// remove the file from local server

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response

    } catch (error) {
        // remove the locally saved temporary file as the upload operation got failed
        // to remove malicious or corrupted file from the local server
        fs.unlinkSync(localFilePath)
        return null
    }
}


export {uploadOnCloudinary}
