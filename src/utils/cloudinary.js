import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file to cloudinary
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        // file has been uploaded
        console.log("File uploaded to Cloudinary",res.url);
        return res
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload failed
        return null
    }
}

export {uploadOnCloudinary}