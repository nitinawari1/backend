import mongoose from "mongoose";
import brypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema  = new mongoose.Schema({
         username:{
                  type:String,
                  required:true,
                  unique:true,
                  lowercase:true,
                  trim:true,
                  index:true
         },
         email:{
                  type:String,
                  required:true,
                  unique:true,
                  lowercase:true,
                  trim:true,
                  
         },
         fullName:{
                  type:String,
                  required:true,
                  trim:true,
                  index:true
         },
         avatar:{
                  type:String,
                  required:true
         },
         coverImage:{
                  type:String

         },
         password:{
                  type:String,
                  required:[true , "password is required"]
         },
         refreshToken:{
                  type:String,
            
         },
         watchHistory:[{
            type: mongoose.Schema.Types.ObjectId,
                  ref:'Video'
         }]
},{timestamps:true});


userSchema.pre("save" , async function (next)  {
         if(!this.isModified("password")) return next(); 
      this.password = await brypt.hash(this.password , 10 )
      next()
})

//custom method for checking password 
userSchema.methods.ispasswordcorrect = async function
(password){
         return await brypt.compare(password , this.password)  // return bolean value 
}

userSchema.methods.generateAccessToken = function(){
         return jwt.sign(
                  {
                        _id: this._id,
                        username : this.username,
                        email:this.email,
                        fullName:this.fullName   
                  },
                  process.env.ACCESS_TOKEN_SECRET , 
                  {
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
                  }
         )
}
userSchema.methods.generateRefreshToken =  function(){
         return   jwt.sign(
                  {
                        _id:this._id,
                  },
                  process.env.REFRESH_TOKEN_SECRET, 
                  {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
                  }
         )
}

export const User = mongoose.model("User", userSchema)