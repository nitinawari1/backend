import mongoose  from "mongoose"
import { DB_NAME } from "../constants.js";


const connetDB = async () =>  {

  console.log("connecting database...")
         try {
           const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` )
           console.log(`\n MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`)
         } catch (error) {
         console.log("MONGODB Connection error  " , error);
         process.exit(1) // process is node.js method give various functionallity one of these is a exit that exit code with certain number  here is  one 
         }
}

export default connetDB