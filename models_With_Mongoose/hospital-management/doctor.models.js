import mongoose from "mongoose";

const doctorSchema  = mongoose.Schema({},{timestamps})

 export const Doctor = mongoose.model("Doctor" , doctorSchema)
