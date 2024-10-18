import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use  - it mostly use for settingup middelware 
//Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.

app.use(cors({
         origin:process.env.CORS_ORIGIN,
         Credential: true
}))

//setting middleware to  recieve json formate data from form 
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true , limit:"16kb"}))

app.use(express.static("public")) //it will store image , files for temperary in public folder 

app.use(cookieParser())// use for crud operation on cokkies

//importing routes
import userRouter from "./routes/user.routes.js"

//routes declaration 
app.use("/api/v1/users" , userRouter ) //userrouter is  a router 

export default app;

