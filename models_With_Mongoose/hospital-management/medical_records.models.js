import mongoose from "mongoose";

const medicalRecordSchema  = mongoose.Schema({},{timestamps})

export const MedicalRecord = mongoose.model("MedicalRecord" , medicalRecordSchema)
