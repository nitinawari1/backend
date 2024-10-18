import mongoose from "mongoose";

const patientSchema  = mongoose.Schema({
         name:{
                  type:String,
                   required:true
         },
         diagonsedWith:{
                  type:String,
                   required:true
         },
         address:{
                  type:String,
                   required:true
         },
         age:{
                   type:Number,
                   required:true
         },
         bloodGroup:{
                  type:String,
                   required:true
         },
         gender:{
                  type:String,
                  enum:["M" ,"F" , "O"]
         },
         admittedIn:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:"Hospital"
         }
},{timestamps})

export const Patient = mongoose.model("Patient" , patientSchema)
