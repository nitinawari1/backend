import connectDB from "./db/index.js"
import dotenv from "dotenv"
import app from "./app.js"


dotenv.config({
   path:'./.env'
})


connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000 , ()=>{
      console.log(`server  is at port ${process.env.PORT}`)
   })
   app.on("error" ,(error)=>{
      console.log("error" , error)
      throw error
   }) 
})
.catch((err)=>{
console.log("  mongo db connection failed !!! :", err)
})

















//first way to connect dB
/*
import mongoose  from "mongoose"
import { DB_NAME } from "./constants";
import express from "express"
const app = express()
(async ()=>{
   try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 

      app.on("error" ,(error)=>{
         console.log("error" , error)
         throw error
      }) 
      app.listen(process.env.PORT , ()=>{
         console.log(`App is listening on port ${process.env.PORT}`)
      })

   } catch (error) {
      console.error("Error :" , error)
      throw error
   }
})
()
*/