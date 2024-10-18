import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
{
         name:{
                  type:String,
                  required:true
         }
       
},{timestamps:true}
) // create schema and storing in variable 
 
export const Category = mongoose.model("Category" ,categorySchema)