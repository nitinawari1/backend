import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
         username:{
                  type:String,
                  required:true,
                  unique:true,
                  lowercase:true

         },
         email:{
                  type:String,
                  required:true,
                  unique:true,
                  lowercase:true
         },
         password:{
                  type:String,
                  required:[true , "password is required"]
         }
},{timestamps:true}
) // create schema and storing in variable 
 
export const User = mongoose.model("User" ,UserSchema)