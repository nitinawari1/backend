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
//This line creates a Mongoose model based on the defined schema. A model is a class that represents a collection of documents in the MongoDB database that adheres to the schema.

//The mongoose.model() function takes two arguments: the name of the model and the schema to be used. In this case, the model is named "User", and it uses the UserSchema defined earlier.

//Finally, the export keyword is used to export the User model, making it available for use in other parts of your application.