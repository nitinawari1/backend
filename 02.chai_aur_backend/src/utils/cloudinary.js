
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});



const uploadOnCloudinary = async(localfilepath)=>{
         try {
                  if(!localfilepath) return null
              const responce =   await cloudinary.uploader.upload(localfilepath,
                  {resource_type:"auto"}, 
                  )
                  //file as been uploaded successfull
                 
                 
                  // console.log("file id uploaded on cloudinary  " , responce.url)
   
                  
                   //if file upload successfully remove it from temp 
                   fs.unlinkSync(localfilepath)  
                  return responce
         } catch (error) {
               fs.unlinkSync(localfilepath)  
               //remove the locally saved temporary file as  the upload operation got failed 
              return null; 
         }
}
const destroyPreUploadedFile=async(previousFilePath)=>{
  try {
    if(!previousFilePath) return null;
// Extract public ID from Cloudinary URL

    function extractPublicId(previousFilePath) {
      const parts = url.split('/');
      const lastPart = parts[parts.length - 1];
      const withoutExtension = lastPart.split('.')[0];
      return withoutExtension;
  }
  const public_id = extractPublicId(previousFilePath)

     const responce =  await cloudinary.uploader.destroy(public_id)
   
     return responce 
    
  } catch (error) {
    console.log("avatar destroying err: ", error)
  }

}
export {uploadOnCloudinary , destroyPreUploadedFile}