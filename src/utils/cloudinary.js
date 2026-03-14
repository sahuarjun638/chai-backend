import {v2 as cloudinary} from "cloudinary";
import fs from "fs"


cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
  api_key:CLOUDINARY_API_KEY , 
  api_secret:CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePathf) => {
  try {
    if(!localFilePathf) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePathf, {
        resource_type: "auto"
    })
    // file has been successfully uploaded
    console.log("file is uploaded on cloudinary", response.url )
  } catch (error) {
      fs.unlinkSync(localFilePathf) //remove the locally saved temporary file as the upload operation got failed
      return null
  }
}

export {uploadOnCloudinary}