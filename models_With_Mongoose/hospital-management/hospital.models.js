import mongoose from "mongoose";

const hospitalSchema  = mongoose.Schema({},{timestamps})

export const Hospital = mongoose.model("Hospital" , hospitalSchema)
