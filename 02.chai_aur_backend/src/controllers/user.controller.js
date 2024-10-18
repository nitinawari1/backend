import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse } from "../utils/ApiResponce.js"
import {uploadOnCloudinary , destroyPreUploadedFile} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
//this is a register user function wrap with asynchandler . it is a controller that extract from app.get it work similar app.get callback fn  
//it get execute when user hit this url whereregister has functionality
const registerUser = asyncHandler(async (req , res)=>{
// 1. get the user details from frontend 
// 2. validation - not empty body
// 3. check if user already exist - using  email or username
// 4. check for images , check for avatar 
// 5. upload them to  cloudinary , avatar 
// 6. create user object - create entry db   
// 7. remove the password and refresh token filed from responce 
// 8. check user reaction 
// 9. return responce
 const {username , email  , fullName , password} = req.body
     console.log('request boody : ' , req.body)
//  if(fullName === ""){
//      throw new ApiError(400 , "fullname is required ")
//  }

if(
     [username , email  , fullName , password].some((field)=>field?.trim()==="") //checking  values are mepty or not 
){
     throw new ApiError(400 , "fullname is required ")
}

// user is directly connected to the mongodb though mongoose  so it can query directly 
  const userexisted = await User.findOne({
     $or:[{email} , {username}] // 
 })
//  console.log(userexisted)

 if(userexisted){
     throw new ApiError(409 , "user or email already exist")
 }


 //check files already exist in public/tmp bfore uploading 
 const avatarLocalPath = req.files?.avatar[0]?.path
//  const coverImageLocalPath = req.files?.coverImage[0]?.path
     let coverImageLocalPath;

 if(req.file && Array.isArray(req.files.coverImage) && req.files.coverImage[0].length > 0  ){
     coverImageLocalPath = req.files?.coverImage[0]?.path 

}

//  console.log(req.files);

if(!avatarLocalPath){
     throw new ApiError(400 , 'avatar is required'  )
}

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     
     
     const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

// console.log(avatar)

      if(!avatar){
          throw new ApiError(400 , 'avatar is required')
      }


     const user =await User.create({
          fullName,
          avatar:avatar.url,
          coverImage: coverImage?.url || "",
          email,
          password,
          username:username.toLowerCase()

      })

     const createduser = await User.findById(user._id).select(
          "-password -refreshToken"
      )

     if(!createduser){
          throw new ApiError(500 , "something went wrong by registering user ")
     }


return res.status(200).json(
     new ApiResponse(200, createduser , "user registered succesfully ")
)
})

const generateAccessTokenAndRefreshToken = async (userid)=>{
     const user = await User.findById(userid);
    const AccessToken =    user.generateAccessToken()
   const RefreshToken = user.generateRefreshToken()

     user.refreshToken = RefreshToken
     user.save({validateBeforeSave:false})

     return {AccessToken , RefreshToken}


}

const loginUser = asyncHandler(async (req , res)=>{
     // res.body 
     // un/email and password 
     //match with mongo db  userexxist
     //password check 
     //accesstoken and refresh token 
     //send coookie

     const {username , email , password} = req.body
     console.log(req.body)
     // if ([{username},{email},{password}].some((field)=>field?.trim() === "")){
     //      throw new ApiError(400 ,`${field} is required`)
     // }
   
     if(!(username  ||  email) ){
          throw new ApiError (400 , "username or email is required ")
     }

  const user = await  User.findOne({
          $or:[{email} , {username}]
     })



if(!user){
 throw new ApiError(404 , "user does not exist ")
}

  const isPasswordValid =  await user.ispasswordcorrect(password);

  if(!isPasswordValid){
     throw new ApiError(401 , "Invalid user creadencials  ")
  }



 const {AccessToken , RefreshToken} =  await generateAccessTokenAndRefreshToken(user._id)

const logedInUser = await User.findById(user._id).select(
     "-password -refreshToken"
)
const options = {
     httpOnly : true,
     secure : true
}
res
.status(200)
.cookie("accessToken" , AccessToken , options)
.cookie("refreshToken" , RefreshToken , options)
.json(
     new ApiResponse(
          200,
          {
               user: logedInUser , AccessToken , RefreshToken
          },
          "User logged In successfully"
     )
)
})

const logoutUser = asyncHandler(async (req , res)=>{
 await User.findByIdAndUpdate(
      req.user?._id,
      {
           $set:{
               refershToken:undefined
          }
      },
      {
          new: true 
     }
     )
     // console.log( res.user?._id)
   const options = {
     httpOnly : true,
     secure : true
}

 return res
.status(200)
   .clearCookie("accessToken" , options)
   .clearCookie("refreshToken" ,options)
   .json(
        new ApiResponse(200,{},  "User logged out" )
   )

})


const refreshAccessToken = asyncHandler(async(req , res)=>{
     //extract refrsh token from cookie
     //check avaiable or  not 
     //find or match the refresh token in database 
     //not found thorw error
     //call the gerate accestoken fn 
     //return access token 

     const incomingRefreshToken = req.cookies.refreshToken || req.body.refershToken 

     if (!incomingRefreshToken) {
          throw new ApiError(401 , " unauthorized access " )
     }

   try {
       const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
  
       
       
       const user =  await User.findById(decodedToken?._id)
       
       if(!user){
            throw new ApiError(404 , " Invalid refreshToken")
       }
  
       if(incomingRefreshToken !== user.refreshToken){
            throw new ApiError(401 , "refresh Token is exprired or used " )
       }
  
        const {AccessToken , RefreshToken : NewRefreshToken} = await generateAccessTokenAndRefreshToken(user._id)
  
        const options = {
            httpOnly : true,
            secure : true
       }
       res
       .status(200)
       .cookie("accessToken" , AccessToken , options)
       .cookie("refreshToken" , NewRefreshToken , options)
       .json(
            new ApiResponse(
                 200,
                 {
                      accessToken:AccessToken , refreshToken:NewRefreshToken
                 },
                 "AccessToken regenated "
            )
       )      
   } 
   catch (error) {
     throw new ApiError(401 , error?.message || "invalid refresh Token" )
   }
})


const changeCurrentPassword = asyncHandler(async(req , res)=>{
     const {oldPassword , newPassword} = req.body
     console.log(oldPassword , newPassword)
     
     if (!(oldPassword && newPassword)){
          throw new ApiError(400 , "oldpassword and Newpassword is required " )
     }

     // console.log(req.user?._id)
     const user  = await User.findById(req.user?._id)
     // console.log(req.user?._id)
     if(!user){
          throw new ApiError(401 , "unthorized access")
     }

     const isPasswordValid =  await user.ispasswordcorrect(oldPassword)
     
     if(!isPasswordValid){
          throw new ApiError(401 , "Invalid credentials")
     }
     
     user.password = newPassword
     user.save({validateBeforeSave:false})

     res
     .status(200)
     .json(
          new ApiResponse(
               200,
               {
                    oldPassword , newPassword
               },
               "password change successfully"

          )
     )

})


const getCurrentuser=asyncHandler(async (req , res)=>{
     return res
     .status(200)
     .json(new ApiResponse(200 , req.user , "user fetch successfully"))
} )
const updateUserDetails=asyncHandler(async(req , res)=>{
     const {username , email , fullName } = req.body
     console.log(req.body)

     if(!username && !email && !fullName){
          throw new ApiError(401  , "All field is required ")
     }
   
     const user  = await User.findByIdAndUpdate(
          req.user?._id,
          {
               $set:{
                    fullName,
                    email,
                    username
               }
          },
          {new:true}

          ).select("-password")

   return  res.status(200 )
     .json(new ApiResponse(200 , user , "details update  succesfully  "))
     

} )

const updateAvatar  = asyncHandler(async(req , res)=>{
     
     const avatarLocalPath = req.file?.path
     console.log(avatarLocalPath)
     if(!avatarLocalPath){
               throw new ApiError(400 , "avatar is missing ")
     }
     const newAvatar = await uploadOnCloudinary(avatarLocalPath);
     

     if(! newAvatar.url){
          throw new ApiError(400 , "error while upoloading avatar to coudinary")

     }

  const previousFilePath = req.user.avatar;

    const previousFiles = await destroyPreUploadedFile(previousFilePath)    

     const user = await User.findByIdAndUpdate(
          res.user?._id,
          {
               $set:{
                    avatar : newAvatar.url
               }
          }
     ).select("-password")
     return  res
     .status(200)
      .json(
          new ApiResponse(
               200,
              user,
               "avatar chnage succusefully"
          )
     )    
})

const updateCoverImage  = asyncHandler(async(req , res)=>{
     const coverImageLocalPath = req.file?.path

     if(!coverImageLocalPath){
               throw new ApiError(400 , "coverImage is missing ")
     }
     const coverImage = await uploadOnCloudinary(coverImageLocalPath);

     if(!coverImage.url){
          throw new ApiError(400 , "error while upoloading coverImage  to coudinary")

     }
     const previousFilePath = req.user.coverImage;
  
    const previousFiles = await destroyPreUploadedFile(previousFilePath)    

     const user = await User.findByIdAndUpdate(
          res.user?._id,
          {
               $set:{
                    coverImage : coverImage.url
               }
          }
     ).select("-password")
     return res.status(200).json(new ApiResponse(200 , user , "coverImage upload successfully "))
})



export {registerUser , loginUser, logoutUser, refreshAccessToken , changeCurrentPassword , getCurrentuser , updateUserDetails , updateAvatar , updateCoverImage 
}